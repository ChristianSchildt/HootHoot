class Player {
    constructor(socket, name) {
        this.socket = socket
        this.name = name
    }

    answerIndex = undefined
}

module.exports = Player;