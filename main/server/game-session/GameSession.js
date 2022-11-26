Player = require('./Player')

class GameSession {
    constructor(host, pin, time, question, answers, correctAnswer) {
        this.host = host;
        this.pin = pin;
        this.time = time;
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.players = new Map();
    }

    addPlayer(socket, args) {
        this.players.set(socket.id, new Player(socket, args.name));

        // set up hooks
        socket.on('answer', (answer) => { this.selectAnswer(socket, answer);});
        socket.on('disconnect', this.removePlayer);

        // inform all other players
        let playerNames = this.getPlayerNames();
        for (const player of this.players.values()) {
            player.socket.emit('players-updated', playerNames);
        };

        console.log("player " + args.name + " joined");
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

    selectAnswer(socket, answer) {
        this.players.get(socket.id).answer = answer;

        console.log("user " + this.players.get(socket.id).name + " selected answer " + answer);
    }

    startQuiz(socket) {
        if (socket.id != this.host.id)
            return

        for (const player of this.players.values()) {
            player.socket.emit('quiz-started', this.time);
        };
        setTimeout(this.time * 1000, this.stopQuiz);
    }

    stopQuiz() {
        for (const player of this.players.values()) {
            player.socket.emit('quiz-ended', this.correctAnswer);
        };
    }

    getPlayerNames() {
        return Array.from(this.players.values()).map((player) => {
            return player.name;
        });
    }
}

module.exports = GameSession;