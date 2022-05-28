CREATE SCHEMA "hoothoot";

SET search_path TO 'hoothoot';

DROP TABLE IF EXISTS "user" CASCADE; 
DROP TABLE IF EXISTS "role" CASCADE; 
DROP TABLE IF EXISTS "question" CASCADE; 
DROP TABLE IF EXISTS "answer" CASCADE; 
DROP TABLE IF EXISTS "course" CASCADE; 
DROP TABLE IF EXISTS "media" CASCADE; 
DROP TABLE IF EXISTS "question_media" CASCADE; 
DROP TABLE IF EXISTS "quiz" CASCADE; 
DROP TABLE IF EXISTS "review" CASCADE; 
DROP TABLE IF EXISTS "user_quiz" CASCADE; 
DROP TABLE IF EXISTS "quiz_question" CASCADE; 

CREATE TABLE "user" 
( 
	"id" serial NOT NULL UNIQUE,
	"username" text NOT NULL UNIQUE,
	"password" text NOT NULL UNIQUE,
	"email" text NOT NULL UNIQUE,
	"name" text,
	"roleid" integer NOT NULL
); 

CREATE TABLE "role" 
( 
	"id" integer NOT NULL UNIQUE,
	"name" text NOT NULL UNIQUE
); 

CREATE TABLE "question" 
( 
	"id" integer NOT NULL UNIQUE,
	"question" text,
	"type" text,
	"topic" text,
	"courseid" integer NOT NULL,
	"userid" serial NOT NULL
); 

CREATE TABLE "answer" 
( 
	"id" serial NOT NULL,
	"questionid" integer NOT NULL,
	"answer" text,
	"iscorrect" boolean
); 

CREATE TABLE "course" 
( 
	"id" integer NOT NULL UNIQUE,
	"name" text
); 

CREATE TABLE "media" 
( 
	"id" integer NOT NULL UNIQUE,
	"url" text
); 

CREATE TABLE "question_media" 
( 
	"id" integer NOT NULL UNIQUE,
	"mediaid" integer NOT NULL
); 

CREATE TABLE "quiz" 
( 
	"id" integer NOT NULL UNIQUE,
	"sessionname" text,
	"time" text,
	"timelimit" text,
	"sessionpin" text
); 

CREATE TABLE "review" 
( 
	"id" integer NOT NULL,
	"quizid" integer NOT NULL,
	"score" text,
	"time" integer,
	"winner" integer
); 

CREATE TABLE "user_quiz" 
( 
	"quizid" integer NOT NULL,
	"userid" serial NOT NULL,
	"reviewid" text
); 

CREATE TABLE "quiz_question" 
( 
	"quizid" integer NOT NULL UNIQUE,
	"id" integer NOT NULL
); 

ALTER TABLE "user" ADD PRIMARY KEY ("id");
ALTER TABLE "role" ADD PRIMARY KEY ("id");
ALTER TABLE "question" ADD PRIMARY KEY ("id");
ALTER TABLE "answer" ADD PRIMARY KEY ("id", "questionid");
ALTER TABLE "course" ADD PRIMARY KEY ("id");
ALTER TABLE "media" ADD PRIMARY KEY ("id");
ALTER TABLE "question_media" ADD PRIMARY KEY ("id");
ALTER TABLE "quiz" ADD PRIMARY KEY ("id");
ALTER TABLE "review" ADD PRIMARY KEY ("id", "quizid");
ALTER TABLE "user_quiz" ADD PRIMARY KEY ("quizid", "userid");
ALTER TABLE "quiz_question" ADD PRIMARY KEY ("quizid");

ALTER TABLE "user" ADD CONSTRAINT "user_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "role"("id");
ALTER TABLE "question" ADD CONSTRAINT "question_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "course"("id");
ALTER TABLE "question" ADD CONSTRAINT "question_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id");
ALTER TABLE "answer" ADD CONSTRAINT "answer_questionid_fkey" FOREIGN KEY ("questionid") REFERENCES "question"("id");
ALTER TABLE "question_media" ADD CONSTRAINT "question_media_id_fkey" FOREIGN KEY ("id") REFERENCES "question"("id");
ALTER TABLE "question_media" ADD CONSTRAINT "question_media_mediaid_fkey" FOREIGN KEY ("mediaid") REFERENCES "media"("id");
ALTER TABLE "review" ADD CONSTRAINT "review_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "quiz_question"("quizid");
ALTER TABLE "user_quiz" ADD CONSTRAINT "user_quiz_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "quiz"("id");
ALTER TABLE "user_quiz" ADD CONSTRAINT "user_quiz_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id");
ALTER TABLE "quiz_question" ADD CONSTRAINT "quiz_question_quizid_fkey" FOREIGN KEY ("quizid") REFERENCES "quiz"("id");
ALTER TABLE "quiz_question" ADD CONSTRAINT "quiz_question_id_fkey" FOREIGN KEY ("id") REFERENCES "question"("id");
ALTER TABLE "question_media" ADD CONSTRAINT "transformation_FK_unique" UNIQUE ("id","mediaid");
