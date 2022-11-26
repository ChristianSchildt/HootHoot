class Player {
    constructor(socket, name) {
        this.socket = socket
        this.name = name
    }

    answer = undefined
}

module.exports = Player;