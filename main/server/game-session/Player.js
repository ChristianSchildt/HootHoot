class Player {
    constructor(socket, name) {
        this.socket = socket
        this.name = name
    }

    answerIndex = undefined
    time = undefined
    points = undefined
}

module.exports = Player;