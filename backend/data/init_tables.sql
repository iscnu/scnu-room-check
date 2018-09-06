DROP TABLE IF EXISTS "courses";
CREATE TABLE "courses" (
	`id`	INTEGER PRIMARY KEY AUTOINCREMENT,
	`code`	TEXT,
	`name`	TEXT,
	`teacher`	TEXT,
	`campus`	INTEGER,
	`place`	INTEGER,
	`department`	TEXT
);

DROP TABLE IF EXISTS "places";
CREATE TABLE "places" (
	`campus`	INTEGER,
	`place`	TEXT,
	`part`	INTEGER,
	`order`	INTEGER
);

DROP TABLE IF EXISTS "time";
CREATE TABLE `time` (
	`course_id`	INTEGER,
	`day`	INTEGER,
	`order`	INTEGER
);

DROP TABLE IF EXISTS "weeks";
CREATE TABLE `weeks` (
	`course_id`	INTEGER,
	`week`	INTEGER
);