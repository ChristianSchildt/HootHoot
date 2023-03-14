const router = require("express").Router();
const authorize = require("../middleware/authorize");
const getPool = require("../db");
const pool = getPool();

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
//-------------------------------------------------------------------------------



//-------------------------------------------------------------------------------
//get all questions for a selected course
router.get('/api/courses/:courseid/questions', async(req, res) => {
  try {
    const results = await pool.query('SELECT * FROM question WHERE courseid = $1', [req.params.courseid]);
    
    console.log('select questions with specified courseid')
    
    res.json(results.rows)
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data:{
        questions: results.rows
      }
    });

  } catch (e) {
    console.log(e)
  }
})

//get all questions for the current user
router.get('/api/user/questions', authorize, async(req, res) => {
  try {
    const results = await pool.query('SELECT * FROM question '+
                                     'WHERE user_id = $1', 
                                      [req.user.id]);
    console.log('select all questions for the current user')

    res.json(results.rows)
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data:{
        questions: results.rows
      }
    });
    
  } catch (e) {
    console.log(e)
  }
})

//get answers for a selected question
router.get('/api/answers/:questionid', async(req, res) => {
  try {
    const results = await pool.query('SELECT * FROM answer WHERE questionid = $1', [req.params.questionid]);
    
    console.log('select answers with specified questionid')
    console.log("HIER GUCKEN: "+JSON.stringify(results.rows))
    res.json(results.rows)
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data:{
        answer: results.rows
      }
    });
    
  } catch (e) {
    console.log(e)
  }
})

//create question
router.post("/api/question", authorize, async(req, res) => {
  try{                                                
    const results = await pool.query('INSERT INTO question (name, type, timelimit, points, answer_options, courseid, user_id) '+ 
                                     'VALUES ($1, $2, $3, $4 ,$5 ,$6 ,$7) RETURNING *', 
                                     [req.body.name, req.body.type, req.body.timelimit, req.body.points, req.body.answer_options, 
                                      req.body.courseid, req.user.id]);
    
    console.log("CREATED a question");
    console.log(results);
    console.log("id?ist es das: "+results.rows[0].id)
    res.status(201).json({
      status: "success",
      data: {
        questionid: results.rows[0].id
      }
    });

  } catch(e){
    console.log(e);
  }
});

//create answer
router.post('/api/answer/', async(req, res) => {
  try {
    const results = await pool.query('INSERT INTO answer (questionid, answer, iscorrect) '+
                                     'VALUES ($1, $2, $3) RETURNING *',
                                     [req.body.questionid, req.body.answer, req.body.iscorrect])
    
    console.log('CREATED an answer')
    console.log(results)

    res.status(201).json({
      status: {
        answers: results.rows
      }
    })

  } catch (e) {
    console.log(e)
  }
})

//update question

//update answer

//duplicate question

//duplicate answer

//delete question
router.delete('/api/questions/:id', async(req, res) => {
  try {
    
    const results = await pool.query('DELETE FROM question '+
                                     'WHERE id = $1', 
                                     [req.params.id]);

    console.log('DELETE question sucessfully')

    res.status(204).json({
      status: "success"
    });

  } catch (e) {
    console.log(e)
  }
})

//delete answers
router.delete('/api/questions/:questionid/answers/', async(req, res) => {
  try {
    
    const results = await pool.query('DELETE FROM answer '+
                                     'WHERE questionid = $1', 
                                     [req.params.questionid]);

    console.log('DELETE answers sucessfully')

    res.status(204).json({
      status: "success"
    });

  } catch (e) {
    console.log(e)
  }
})



module.exports = router;
