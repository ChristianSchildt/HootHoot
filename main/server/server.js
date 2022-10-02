require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")
//console.log(require('dotenv').config())

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

 

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
