class GameSession {
    constructor(host, pin, time, question, answers, correctAnswer) {
        this.host = host;
        this.pin = pin;
        this.time = time;
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.players = {};
    }

    addPlayer(socket, args) {
        this.players[socket.id] = new Player(socket, args.name);

        // set up hooks
        socket.on('answer', (answer) => { this.selectAnswer(socket, answer);});
        socket.on('disconnect', removePlayer);

        // inform all other players
        let playerNames = getPlayerNames();
        this.players.forEach(player => {
            player.socket.emit('players-updated', playerNames);
        });

        console.log("player " + args.name + " joined");
    }

    removePlayer(socket) {
        if (!this.players.hasOwnProperty(socket.id))
            return

        delete this.players[socket.id];

        // inform all other players
        let playerNames = getPlayerNames();
        this.players.forEach(player => {
            player.socket.emit('players-updated', playerNames);
        });

        console.log("player " + socket.id + " left");
    }

    selectAnswer(socket, answer) {
        players[socket.id].answer = answer;

        console.log("user " + socket.id + " selected answer " + answer);
    }

    startQuiz(socket) {
        if (socket.id != this.host.id)
            return

        this.players.forEach(player => {
            player.socket.emit('quiz-started', this.time);
        });
        setTimeout(this.time * 1000, this.stopQuiz);
    }

    stopQuiz() {
        this.players.forEach(player => {
            player.socket.emit('quiz-ended', this.correctAnswer);
        });
    }

    getPlayerNames() {
        return this.players.map((player) => {
            return player.name;
        });
    }
}

module.exports = GameSession;