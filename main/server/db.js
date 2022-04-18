require('dotenv').config();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Pa$$w0rt",
  host: "localhost",
  port: 5432 ,
  database: "hoothoot"
});

module.exports = pool;
