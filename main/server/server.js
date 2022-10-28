require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");

//console.log(require('dotenv').config())

//middleware
app.use(cors());
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({limit: '1mb'}));

//routes
app.use("/authentication", require("./routes/jwtAuth"));
app.use("/", require("./routes/routes"));



app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
