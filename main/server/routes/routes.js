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

//Get all courses
router.get("/api/courses", authorize, async(req, res) =>{
  try{
    console.log(req.user.id);
    const results = await pool.query("SELECT * FROM course WHERE user_id = $1", [req.user.id]);
    console.log("Get all Courses");
    console.log(results);
    res.json(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data:{
        courses: results.rows
      }
    });
  }catch(e){
    console.log(e);
  }
});


//Get a course
router.get("/api/courses/:id", authorize, async(req, res) =>{
  try{
    const results = await pool.query("SELECT * FROM course WHERE id=$1", [req.params.id]);
    console.log("Get a course");
    console.log(results);
    console.log(req.params);
    res.status(200).json({
      status: "success",
      data:{
        courses: results.rows
      }
    });
  }catch(e){
    console.log(e);
  }
});


//create a course
router.post("/api/courses", authorize, async(req,res) =>{
  try{
    const name = req.body.name;
    const user_id = req.user.id;
    console.log(req.body.name);
    const results = await pool.query("INSERT INTO course (name, user_id) VALUES ($1, $2) returning *", [name, user_id]);
    console.log("Created a course");
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        course: results.rows
      }
    });

  }catch(e){
    console.log(e);
  }
});

//delete course
router.delete("/api/courses/:id", authorize, async(req,res) => {
  try{
    const results = await pool.query("DELETE FROM course WHERE id = $1", [req.params.id]);
    console.log("DELETE GREAT SUCCESS")
    res.status(204).json({
      status: "success"
    });
  }catch(e){
    console.log(e);
  }
});




module.exports = router;
