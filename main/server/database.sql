CREATE DATABASE hoothoot;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS answer CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS question_media CASCADE;
DROP TABLE IF EXISTS quiz CASCADE;
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
	id integer UNIQUE,
	description text NOT NULL UNIQUE
); 

CREATE TABLE question 
( 
	id integer NOT NULL UNIQUE,
	topic text,
	name text,
	type text,
	timelimit integer,
	points text,
	answer_options text,
	courseid integer NOT NULL,
	user_id uuid REFERENCES users(user_id)
); 

CREATE TABLE answer 
( 
	id serial NOT NULL,
	questionid integer NOT NULL,
	answer text,
	iscorrect boolean
); 

CREATE TABLE course 
( 
	id serial UNIQUE,
	name text,
	user_id uuid
); 

CREATE TABLE media 
( 
	id integer NOT NULL UNIQUE,
	url text
); 

CREATE TABLE question_media
( 
	id integer NOT NULL UNIQUE,
	mediaid integer NOT NULL
); 

CREATE TABLE quiz
( 
	id integer NOT NULL UNIQUE,
	sessionname text,
	time text,
	timelimit text,
	sessionpin text
); 

CREATE TABLE review 
( 
	id integer NOT NULL,
	quizid integer NOT NULL,
	score text,
	time integer,
	winner integer
); 

CREATE TABLE user_quiz 
( 
	quizid integer NOT NULL,
	user_id uuid REFERENCES users(user_id),
	reviewid text
); 

CREATE TABLE quiz_question 
( 
	quizid integer NOT NULL UNIQUE,
	id integer NOT NULL
); 


--ALTER TABLE role ADD PRIMARY KEY (id);
ALTER TABLE question ADD PRIMARY KEY (id);
ALTER TABLE answer ADD PRIMARY KEY (id, questionid);
ALTER TABLE course ADD PRIMARY KEY (id);
ALTER TABLE media ADD PRIMARY KEY (id);
ALTER TABLE question_media ADD PRIMARY KEY (id);
ALTER TABLE quiz ADD PRIMARY KEY (id);
ALTER TABLE review ADD PRIMARY KEY (id, quizid);
ALTER TABLE user_quiz ADD PRIMARY KEY (quizid, user_id);
ALTER TABLE quiz_question ADD PRIMARY KEY (quizid);

--ALTER TABLE users ADD CONSTRAINT user_roleid_fkey FOREIGN KEY (roleid) REFERENCES role(id);
ALTER TABLE question ADD CONSTRAINT question_courseid_fkey FOREIGN KEY (courseid) REFERENCES course(id);
ALTER TABLE question ADD CONSTRAINT question_userid_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE answer ADD CONSTRAINT answer_questionid_fkey FOREIGN KEY (questionid) REFERENCES question(id);
ALTER TABLE question_media ADD CONSTRAINT question_media_id_fkey FOREIGN KEY (id) REFERENCES question(id);
ALTER TABLE question_media ADD CONSTRAINT question_media_mediaid_fkey FOREIGN KEY (mediaid) REFERENCES media(id);
ALTER TABLE review ADD CONSTRAINT review_quizid_fkey FOREIGN KEY (quizid) REFERENCES quiz_question(quizid);
ALTER TABLE user_quiz ADD CONSTRAINT user_quiz_quizid_fkey FOREIGN KEY (quizid) REFERENCES quiz(id);
ALTER TABLE user_quiz ADD CONSTRAINT user_quiz_userid_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE quiz_question ADD CONSTRAINT quiz_question_quizid_fkey FOREIGN KEY (quizid) REFERENCES quiz(id);
ALTER TABLE quiz_question ADD CONSTRAINT quiz_question_id_fkey FOREIGN KEY (id) REFERENCES question(id);
ALTER TABLE question_media ADD CONSTRAINT transformation_FK_unique UNIQUE (id,mediaid);
ALTER TABLE course ADD CONSTRAINT course_user_fkey FOREIGN KEY (user_id) REFERENCES users(user_id); 


--INSERT INTO users (user_name, user_password, user_email, name) VALUES ('hoothoot', 'hoothoot', 'hoothoot@hootmail.de', 'HSBO', 1);

-- INSERT INTO course (name) VALUES ('BK1');
-- INSERT INTO course (name) VALUES ('BK2');

-- INSERT INTO question (name, type, timelimit, points, answer_options, courseid, user_id) VALUES ('Erste Frage?', 'quiz', 10, 'standard', 'mehrfachauswahl', 1, '');
-- INSERT INTO question (name, type, timelimit, points, answer_options, courseid, user_id) VALUES ('Zweite Frage?', 'wahrOderFalsch', 20, 'standard', 'einzelauswahl', 1, '');

-- INSERT INTO answer(id, questionid, answer, iscorrect) VALUES (1, 1, 'A', 't');
-- INSERT INTO answer(id, questionid, answer, iscorrect) VALUES (2, 1, 'B', 'f');
-- INSERT INTO answer(id, questionid, answer, iscorrect) VALUES (1, 2, 'A2', 't');
-- INSERT INTO answer(id, questionid, answer, iscorrect) VALUES (2, 2, 'B2', 'f');