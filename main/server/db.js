const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE
});
console.log("database connected.")


function onGameEnded(playerPoints) {
  // array containing objects [{name: '123456', points: 789}, {name: '987654', points: 321}]
  console.log(playerPoints)
}

module.exports = { pool, onGameEnded };
