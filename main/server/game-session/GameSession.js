Player = require('./Player')

class GameSession {
    constructor(host, pin, time, question, answers, correctAnswerIndex) {
        this.host = host;
        this.pin = pin;
        this.time = time;
        this.question = question;
        this.answers = answers;
        this.correctAnswerIndex = correctAnswerIndex;
        this.players = new Map();

        host.on('get-answer-counts', (callback) => (this.getAnswerCounts(host, callback)));
    }

    addPlayer(socket, payload) {
        this.players.set(socket.id, new Player(socket, payload.name));

        // set up hooks
        socket.on('answer', (answer) => { this.selectAnswer(socket, answer);});
        socket.on('disconnect', () => {this.removePlayer(socket);});

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
        this.players.get(socket.id).answerIndex = answerIndex;

        console.log("user " + this.players.get(socket.id).name + " selected answer " + answerIndex);
    }

    startQuiz(socket) {
        if (socket.id != this.host.id) {
            return
        }

        for (const player of this.players.values()) {
            player.socket.emit('quiz-started', this.time);
        };
        setTimeout(this.time * 1000, this.stopQuiz);
    }

    stopQuiz() {
        for (const player of this.players.values()) {
            player.socket.emit('quiz-ended', this.correctAnswerIndex);
        };
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
        let hasAnswer = false;
        for (const player of this.players.values()) {
            hasAnswer = true;
            //console.log(player.answerIndex)
            if (player.answerIndex >= 0 && player.answerIndex <= 3) {
                //console.log("value increased")
                answerCounts[player.answerIndex] = answerCounts[player.answerIndex] + 1;           
            }
        };
        
        console.log(answerCounts)

        // workaround for issue with multiple socket connections for one hist
        // TODO: fix!
        if (hasAnswer) {
            callback(answerCounts)
        }
    }
}

module.exports = GameSession;