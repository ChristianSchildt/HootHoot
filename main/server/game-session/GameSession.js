const getPool = require("../db");
const pool = getPool();
Player = require('./Player')
//const { onGameEnded } = require("../db");

const pointsCalcFunc = (time, elapsedTime) => Math.round(1000 * (time - elapsedTime) / time)

class GameSession {
    constructor(host, pin, quizes) {
        this.host = host;
        this.pin = pin;
        this.quizes = quizes
        this.quiz = quizes[0];
        this.players = new Map();
        this.startTime = null;

        this.timeoutID = undefined;

        host.on('get-answer-counts', (callback) => { this.getAnswerCounts(host, callback); });
        host.on('get-sorted-game-results', (callback) => { this.getSortedGameResults(host, callback); });
        host.on('quiz-started', () => { this.startQuiz(host); });
        host.on('stop-quiz', () => { this.stopQuiz(host); });
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
        player.points = answerIndex == this.quiz.correctAnswerIndex ? pointsCalcFunc(this.quiz.time, (Date.now() - this.startTime) / 1000) : 0;

        console.log("user " + player.name + " selected answer " + answerIndex + " (" + player.points + " points)");

        let answerCount = [...this.players.values()].filter((p) => p.points !== undefined).length // TODO: find nicer solution
        this.host.emit('answer-count-updated', answerCount)
    }

    startQuiz(socket) {
        if (socket.id != this.host.id) {
            return
        }

        if (!this.timeoutID) { // check just to be sure
            this.timeoutID = setTimeout(this.stopQuiz.bind(this), this.quiz.time * 1000);
        }
        this.startTime = Date.now();

        for (const player of this.players.values()) {
            player.socket.emit('quiz-started');
        };
    }

    stopQuiz(socket) {
        if (socket && socket.id != this.host.id) {
            return
        }

        clearTimeout(this.timeoutID);

        for (const player of this.players.values()) {
            player.socket.emit('quiz-ended', this.quiz.correctAnswerIndex);
        };

        let playerTimes = []
        for (const player of this.players.values()) {
            if (player.time != undefined) {
                playerTimes.push({name: player.name, time: player.time});
            }
        };
        if (playerTimes.length > 0) {
            this.saveGameResults(this.quiz.questionId, playerTimes);
        }
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

    async saveGameResults(questionId, playerTimes) {
        // playerTimes is an array containing objects in format [{name: '123456', time: 10}, {name: '987654', time: 5}]
        console.log(playerTimes)

        // code below throws exceptions
        return

        let body = {
            questionid: question_id,
            name: this.name,
            score: points
        }

        const name = req.body.name;
        const user_id = req.user.id;
        const score = req.body.score
        const questionid = req.body.questionid
        console.log(req.body.name);
        await pool.query("INSERT INTO game_session (name, score, question_id) VALUES ($1, $2, $3) returning *", [name, score, questionid]);
    }
}

module.exports = GameSession;