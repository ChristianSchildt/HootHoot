const pool = require("../db");
require('dotenv').config();
Player = require('./Player')
//const { onGameEnded } = require("../db");

const pointsCalcFunc = (time, elapsedTime) => Math.round(1000 * (time - elapsedTime) / time)

class GameSession {
    constructor(host, pin, questions) {
        console.log(questions)
        this.host = host;
        this.pin = pin;
        this.questions = questions
        this.currentQuestionIndex = 0;
        this.question = questions[this.currentQuestionIndex = 0];
        this.players = new Map();
        this.startTime = null;

        this.timeoutID = undefined;

        host.on('get-answer-counts', (callback) => { this.getAnswerCounts(host, callback); });
        host.on('get-sorted-game-results', (callback) => { this.getSortedGameResults(host, callback); });
        host.on('question-started', () => { this.startQuestion(host); });
        host.on('stop-question', () => { this.stopQuestion(host); });
        host.on('has-another-question', (callback) => { this.hasAnotherQuestion(host, callback) });
        host.on('prepare-next-question', (callback) => { this.prepareNextQuestion(host, callback) });
        host.on('get-existing-game-info', (callback) => { this.getExistingGameInfo(host, callback) });
    }

    addPlayer(socket, payload) {
        this.players.set(socket.id, new Player(socket, payload.name));

        // set up hooks
        socket.on('answer', (answer) => { this.selectAnswer(socket, answer); });
        socket.on('disconnect', () => { this.removePlayer(socket); });

        // inform all other players
        let playerNames = this.getPlayerNames();
        this.host.emit('players-updated', playerNames);
        /*for (const player of this.players.values()) {
            player.socket.emit('players-updated', playerNames);
        };*/

        console.log("player " + payload.name + " joined");
    }

    removePlayer(socket) {
        if (!this.players.has(socket.id))
            return

        this.players.delete(socket.id);

        // inform all other players
        let playerNames = this.getPlayerNames();
        for (const player of this.players.values()) {
            player.socket.emit('players-updated', playerNames);
        };

        console.log("player " + socket.id + " left");
    }

    selectAnswer(socket, answerIndex) {
        let player = this.players.get(socket.id);
        player.answerIndex = answerIndex;
        player.time = Math.round((Date.now() - this.startTime) / 1000);
        player.points = answerIndex == this.question.correctAnswerIndex ? pointsCalcFunc(this.question.time, (Date.now() - this.startTime) / 1000) : 0;

        console.log("user " + player.name + " selected answer " + answerIndex + " (" + player.points + " points)");

        let answerCount = [...this.players.values()].filter((p) => p.points !== undefined).length // TODO: find nicer solution
        this.host.emit('answer-count-updated', answerCount)
    }

    startQuestion(socket) {
        if (socket.id != this.host.id) {
            return;
        }

        if (!this.timeoutID) { // check just to be sure
            this.timeoutID = setTimeout(this.stopQuestion.bind(this), this.question.time * 1000);
        }
        this.startTime = Date.now();

        for (const player of this.players.values()) {
            player.socket.emit('question-started');
        };
    }

    stopQuestion(socket) {
        if (socket && socket.id != this.host.id) {
            return
        }

        clearTimeout(this.timeoutID);

        for (const player of this.players.values()) {
            player.socket.emit('question-ended', this.question.correctAnswerIndex);
        };

        let results = []
        for (const player of this.players.values()) {
            if (player.time != undefined && player.answerIndex != undefined) {
                results.push({
                    name: player.name, 
                    time: player.time, 
                    answersId: this.question.answerIds[player.answerIndex]
                });
            }
        };
        if (results.length > 0) {
            this.saveGameResults(this.question.questionId, results);
        }
    }

    hasAnotherQuestion(socket, callback) {
        callback = typeof callback == "function" ? callback : () => {};

        let result = this.currentQuestionIndex < this.questions.length - 1;
        callback(result);
        return result;
    }

    prepareNextQuestion(socket, callback) {
        callback = typeof callback == "function" ? callback : () => {};

        if (!this.hasAnotherQuestion()) {
            console.log("redundant prepareNextQuestion call")
            return;
        }

        clearTimeout(this.timeoutID);
        this.timeoutID = undefined;
        this.time = undefined;
        this.currentQuestionIndex++
        this.question = this.questions[this.currentQuestionIndex];

        callback(this.question);
    }

    getExistingGameInfo(socket, callback) {
        callback = typeof callback == "function" ? callback : () => {};

        callback({
            players: this.getPlayerNames(),
            pin: this.pin,
            questionsAmount: this.questions.length,
            currentQuestionIndex: this.currentQuestionIndex
        });
    }

    getPlayerNames() {
        return Array.from(this.players.values()).map((player) => {
            return player.name;
        });
    }

    getAnswerCounts(socket, callback) {
        callback = typeof callback == "function" ? callback : () => {}
        if (socket.id != this.host.id) {
            return
        }

        let answerCounts = [0, 0, 0, 0];
        for (const player of this.players.values()) {
            //console.log(player.answerIndex)
            if (player.answerIndex >= 0 && player.answerIndex <= 3) {
                //console.log("value increased")
                answerCounts[player.answerIndex] = answerCounts[player.answerIndex] + 1;           
            }
        };
        
        //console.log(answerCounts)

        // workaround for issue with multiple socket connections for one host
        // TODO: fix!
        if (this.players.size > 0) {
            callback(answerCounts)
        }
    }

    getSortedGameResults(socket, callback) {
        callback = typeof callback == "function" ? callback : () => {}
        if (socket.id != this.host.id) {
            return
        }

        let returnValues = []
        for (const player of this.players.values()) {

            if (player.points && player.points > 0) {
                returnValues.push({name: player.name, points: player.points})
            }
        };
        returnValues.sort((a,b) => b.points-a.points);

        // workaround for issue with multiple socket connections for one host
        // TODO: fix!
        if (this.players.size > 0) {
            callback(returnValues)
        }
    }

    async saveGameResults(questionId, gameResults) {
        // gameResults is an array containing objects for each player in format
        // [{name: '123456', time: 10, answerId: 'a-uuid'}, {name: '987654', time: 5, answerId: 'a-uuid'}]
        console.log(gameResults)

        // code below throws exceptions
        //return

        try{
            //Array zum JSON string machen
            const playerTimesJson = JSON.stringify(gameResults);
            await pool.query("INSERT INTO game_session (question_id, player_times) VALUES ($1,$2)",[questionId, playerTimesJson]);
        }catch(e){
            console.log(e);
        }

        
        /*
        playerPoints.forEach( async (name, points) => {
            await pool.query("INSERT INTO game_session (name, score, question_id) VALUES ($1, $2, $3) returning *", [name, points, questionId]);
        });
        */
        
    
    }
}

module.exports = GameSession;