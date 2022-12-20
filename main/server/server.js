const GameSession = require('./game-session/GameSession')

require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");

const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
  cors: {
    origin:'*'
  }
});

//console.log(require('dotenv').config())

//middleware
app.use(cors());
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({limit: '1mb'}));

//routes
app.use("/authentication", require("./routes/jwtAuth"));
app.use("/", require("./routes/routes"));

httpServer.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});

let gameSessions = {
  "123456": new GameSession(null, "12456", 20, "Frage", ["Antwort1", "Antwort2", "Antwort3", "Antwort4"])
};
io.on('connection', (socket) => {
  console.log(socket.id + " connected")

  socket.on('player-join', (payload, callback) => {
    callback = typeof callback == "function" ? callback : () => {}
    let gameSession = gameSessions[payload.gamepin]
    console.log(payload.gamepin)
    if (!gameSession) {
      console.log("invalid game pin")
      callback({error:"invalid game pin"});
      return;
    }
    callback({status:'OK'});
    gameSession.addPlayer(socket, payload)
  })
  
});