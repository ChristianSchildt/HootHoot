const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");


router.get("/userdata", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name, user_email, user_image FROM users WHERE user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/userdata", authorize, async (req, res) => {
  try {
    const data = req.body;

    if (data.user_name) {
      await pool.query(
        "UPDATE users SET user_name = $1 WHERE user_id = $2",
        [data.user_name, req.user.id]
      )
    }
    if (data.user_email) {
      await pool.query(
        "UPDATE users SET user_email = $1 WHERE user_id = $2",
        [data.user_name, req.user.id]
      )
    }
    if (data.user_image) {
      await pool.query(
        "UPDATE users SET user_image = $1 WHERE user_id = $2",
        [data.user_image, req.user.id]
      )
    }
    if (data.user_password) { 
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      await pool.query(
        "UPDATE users SET user_password = $1 WHERE user_id = $2",
        [bcryptPassword, req.user.id]
      )
    }
  } catch (err) {
    console.error(err.message);
  }
});


//all todos and name
router.get("/", authorize, async (req, res) => {
  try {

    // get todo name and description for a specified user id
    const user = await pool.query(
      "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a todo, using authorize middleware
router.post("/todos", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.id, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
router.put("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }

    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
router.delete("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }

    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});


module.exports = router;
