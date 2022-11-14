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
  "12456": {
    playersNames: {
      "HwXUT_CNQM12vlclAAAB": "Dummy Player"
    },
    answers: {
      "HwXUT_CNQM12vlclAAAB": "D"
    }
  }
};
let playerGameSessionMap = {
  "HwXUT_CNQM12vlclAAAB": "12456"
};

io.on('connection', (socket) => {
  console.log("user " + socket.id + " connected");

  socket.on('disconnect', () => {
    console.log("user " + socket.id + " disconnected");
  });

  socket.on('player-join', args => {
    var gameSession = gameSessions[args.gamepin]
    if (!gameSession) {
      console.log("invalid game pin")
      return;
    }
    playerGameSessionMap[[socket.id]] = args.pin
    gameSession.playerNames[socket.id] = args.name
    console.log("player " + args.name + " joined");
  })

  socket.on('answer', (answer) => {
    gameSession.playerNames[socket.id] = args.name
    console.log("user " + socket.id + " selected answer " + answer);
  });
});