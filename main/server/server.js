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

io.on('connection', (socket) => {
  console.log("user " + socket.id + " connected");

  socket.on('disconnect', () => {
    console.log("user " + socket.id + " disconnected");
  });

  socket.on('answer', (answer) => {
    console.log("user " + socket.id + " selected answer " + answer);
  });
});


httpServer.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
