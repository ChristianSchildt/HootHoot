CREATE DATABASE hoothoot;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS answer CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS question_media CASCADE;
DROP TABLE IF EXISTS quiz CASCADE;
DROP TABLE IF EXISTS game_session CASCADE;
DROP TABLE IF EXISTS review CASCADE;
DROP TABLE IF EXISTS user_quiz CASCADE;
DROP TABLE IF EXISTS quiz_question CASCADE;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users 
( 
	user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_name text NOT NULL,
	user_password text NOT NULL,
	user_email text NOT NULL UNIQUE, 
	user_image text DEFAULT NULL
); 

CREATE TABLE role 
( 
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	description text NOT NULL UNIQUE
); 

CREATE TABLE course 
( 
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	name text,
	user_id uuid REFERENCES users(user_id)
);

CREATE TABLE question 
( 
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	topic text,
	name text,
	type text,
	timelimit integer,
	points text,
	answer_options text,
	courseid uuid REFERENCES course(id),
	user_id uuid REFERENCES users(user_id)
); 

CREATE TABLE answer 
( 
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	questionid uuid REFERENCES question(id),
	answer text,
	iscorrect boolean
); 

CREATE TABLE media 
( 
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	url text
); 

CREATE TABLE question_media
( 
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	mediaid uuid REFERENCES media(id)
); 

CREATE TABLE quiz
( 
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	sessionname text,
	time integer,
	timelimit integer,
	sessionpin text
); 

CREATE TABLE game_session
(
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	user_id uuid REFERENCES users(user_id),
	question_id uuid REFERENCES question(id),
	player_times text,
	answerid uuid REFERENCES answer(id),
	datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	sessionid uuid DEFAULT uuid_generate_v4()
);

CREATE TABLE review 
( 
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	quizid uuid REFERENCES quiz(id),
	score integer,
	time integer,
	winner integer
); 

CREATE TABLE user_quiz 
( 
	quizid uuid REFERENCES quiz(id),
	user_id uuid REFERENCES users(user_id),
	reviewid uuid REFERENCES review(id)
); 

CREATE TABLE quiz_question 
( 
	quizid uuid REFERENCES quiz(id),
	questionid uuid REFERENCES question(id)
); 


--INSERT INTO users (user_name, user_password, user_email, name) VALUES ('hoothoot', 'hoothoot', 'hoothoot@hootmail.de', 'HSBO', 1);

-- INSERT INTO course (name) VALUES ('BK1');
-- INSERT INTO course (name) VALUES ('BK2');

-- INSERT INTO question (name, type, timelimit, points, answer_options, courseid, user_id) VALUES ('Erste Frage?', 'quiz', 10, 'standard', 'mehrfachauswahl', 1, '');
-- INSERT INTO question (name, type, timelimit, points, answer_options, courseid, user_id) VALUES ('Zweite Frage?', 'wahrOderFalsch', 20, 'standard', 'einzelauswahl', 1, '');

-- INSERT INTO answer(id, questionid, answer, iscorrect) VALUES (1, 1, 'A', 't');
-- INSERT INTO answer(id, questionid, answer, iscorrect) VALUES (2, 1, 'B', 'f');
-- INSERT INTO answer(id, questionid, answer, iscorrect) VALUES (1, 2, 'A2', 't');
-- INSERT INTO answer(id, questionid, answer, iscorrect) VALUES (2, 2, 'B2', 'f');