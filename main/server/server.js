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
//changed from 5000 to 443
httpServer.listen(443, () => {
  console.log(`Server is starting on port 443`);
});


let gameSessions = {
  
};
function generatePin() {
  let pin = Math.floor(100000 + Math.random() * 900000)
  if (!gameSessions[pin]) {
    return pin;
  }
  else {
    return generatePin()
  }
}

io.on('connection', (socket) => {
  console.log(socket.id + " connected")

  socket.on('create-game', (payload, callback) => {
    callback = typeof callback == "function" ? callback : () => {}
    
    let pin;
    try {
      pin = generatePin();
      //console.log(payload)
      gameSessions[pin] = new GameSession(socket, pin, payload);
      callback({pin});
    }
    catch(err) {
      console.log("host-game failed: " +  err);
      delete gameSessions[pin];
      callback({error: err});
    }
  });

  socket.on('start-game', (payload, callback) => {
    callback = typeof callback == "function" ? callback : () => {}

    try {
      let gameSession = gameSessions[payload.gamepin]
      gameSession.startQuestion()
    }
    catch(err) {
      console.log("start-game failed: " +  err)
      callback({error: err});
    }
    callback({status:'OK'});
  });

  socket.on('player-join', (payload, callback) => {
    callback = typeof callback == "function" ? callback : () => {}

    let gameSession = gameSessions[payload.gamepin]
    //console.log(payload.gamepin)
    if (!gameSession) {
      console.log("invalid game pin")
      callback({error:"invalid game pin"});
      return;
    }
    callback({status:'OK'});
    gameSession.addPlayer(socket, payload)
  })
  
});

