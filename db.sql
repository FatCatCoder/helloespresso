-- Thing To Think about....

/*
   
   - Remove UUID id on user and use username as PK, update FKs.... Replace uuid for FK on journal with owner linking username, and 

   - suggest removing dependacny on uuid-ossp instead opt for local gen_random_uuid ()

*/

-- Useful commands -- 

/*

  DROP TABLE IF EXISTS [insert table name here]; 

*/

CREATE DATABASE espresso;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
  name TEXT CONSTRAINT name_check CHECK (char_length(name) <= 15) NOT NULL UNIQUE,
  email TEXT CONSTRAINT email_check CHECK (char_length(email) <= 254) NOT NULL UNIQUE,
  password TEXT CONSTRAINT password_check CHECK (char_length(password) <= 128) NOT NULL,
  PRIMARY KEY (id)
);


/*
INSERT INTO Users(name, email, password) VALUES('FatCat', 'fatcat@gmail.com', 'badpass');
INSERT INTO Users(name, email, password) VALUES('Dood', 'thedood@gmail.com', '1234');
*/

CREATE TABLE journals (
  id UUID DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
  bean TEXT CONSTRAINT bean_check CHECK (char_length(bean) <= 32) NOT NULL,
  region TEXT CONSTRAINT region_check CHECK (char_length(region) <= 32) NOT NULL,
  roaster TEXT CONSTRAINT name_check CHECK (char_length(roaster) <= 32) NOT NULL,
  logDate DATE DEFAULT CURRENT_DATE,
  logTime TIME DEFAULT CURRENT_TIME,
  PRIMARY KEY (id),
  user_id uuid NOT NULL,
  CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

/*
INSERT INTO Journals(bean, region, roaster, user_id) VALUES('ethiopia', 'agaro', 'buddy brew', (SELECT id FROM Users WHERE name='FatCat'));
INSERT INTO Journals(bean, region, roaster, user_id) VALUES('burundi', 'mutana', 'buddy brew', (SELECT id FROM Users WHERE name='FatCat'));
INSERT INTO Journals(bean, region, roaster, user_id) VALUES('kenya', 'yayahayu', 'kuma', (SELECT id FROM Users WHERE name='Dood'));
*/



CREATE TABLE shots (
  queue SMALLINT,
  journal_id UUID,
  CONSTRAINT journal_id FOREIGN KEY(journal_id) REFERENCES journals(id) ON DELETE CASCADE,
  dose DECIMAL CONSTRAINT dose_check CHECK (char_length(dose::text) <= 5) NOT NULL,
  yield DECIMAL CONSTRAINT yield_check CHECK (char_length(yield::text) <= 5) NOT NULL,
  time DECIMAL CONSTRAINT time_check CHECK (char_length(time::text) <= 5) NOT NULL,
  grind SMALLINT CONSTRAINT bean_check CHECK (char_length(dose::text) <= 5) NOT NULL,
  notes TEXT CONSTRAINT notes_check CHECK (char_length(notes) <= 500),
  attribute TEXT,
  PRIMARY KEY (queue, journal_id)
);

/*
INSERT INTO Shots(queue, journal_id, dose, yield, time, grind, notes, attribute) 
VALUES('1', (SELECT id FROM Journals WHERE bean='ethiopia'), 18, 38, 30, 5, 'good', 'balanced');

INSERT INTO Shots(queue, journal_id, dose, yield, time, grind, notes, attribute) 
VALUES('2', (SELECT id FROM Journals WHERE bean='ethiopia'), 20, 36, 22, 8, 'bad', 'sour');

INSERT INTO Shots(queue, journal_id, dose, yield, time, grind, notes, attribute) 
VALUES('1', (SELECT id FROM Journals WHERE bean='burundi'), 18, 39, 28, 4, 'good', 'balanced');

INSERT INTO Shots(queue, journal_id, dose, yield, time, grind, notes, attribute) 
VALUES('1', (SELECT id FROM Journals WHERE bean='kenya'), 19, 42, 32, 10, 'good', 'bitter');
*/

CREATE TABLE recipes (
  id UUID DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
  user_id UUID,
  CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  bean TEXT CONSTRAINT bean_check CHECK (char_length(bean) <= 32) NOT NULL,
  region TEXT CONSTRAINT region_check CHECK (char_length(region) <= 32) NOT NULL,
  roaster TEXT CONSTRAINT name_check CHECK (char_length(roaster) <= 32) NOT NULL,
  roastDate DATE NOT NULL,
  postDate DATE DEFAULT CURRENT_DATE,
  dose DECIMAL CONSTRAINT dose_check CHECK (char_length(dose::text) <= 5) NOT NULL,
  yield DECIMAL CONSTRAINT yield_check CHECK (char_length(yield::text) <= 5) NOT NULL,
  time DECIMAL CONSTRAINT time_check CHECK (char_length(time::text) <= 5) NOT NULL,
  grind SMALLINT CONSTRAINT grind_check CHECK (char_length(grind::text) <= 5) NOT NULL,
  grinder TEXT CONSTRAINT grinder_check CHECK (char_length(grinder) <= 32)NOT NULL,
  machine TEXT CONSTRAINT machine_check CHECK (char_length(machine) <= 32)NOT NULL,
  tastingNotes TEXT CONSTRAINT tastingNotes_check CHECK (char_length(tastingNotes) <= 50) NOT NULL,
  notes TEXT CONSTRAINT notes_check CHECK (char_length(notes) <= 500),
  roast TEXT NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE recipes
ADD COLUMN process TEXT NOT NULL;

/* 

INSERT INTO recipes(user_id, bean, region, roaster, roastDate, dose, yield, time, grind, grinder, machine, tastingNotes, notes, roast, process) VALUES((SELECT id FROM users WHERE name='FatCat'), 'panama', 'hana', 'Bandit', '2021-06-09', '18', '38', '28.5', '4', 'smart grinder pro', 'gaggia classic', 'sour', 'a decent brew', 'medium', 'natural');

INSERT INTO recipes(user_id, bean, region, roaster, roastDate, dose, yield, time, grind, grinder, machine, tastingNotes, notes, roast, process) VALUES((SELECT id FROM users WHERE name='FatCat'), 'ethiopia', 'Agaro', 'Buddy Brew', '2021-06-09', '18', '38', '28.5', '4', 'smart grinder pro', 'gaggia classic', 'sour', 'a decent brew', 'medium', 'natural');

*/

CREATE TABLE likes (
  user_id UUID NOT NULL,
  CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL,
  CONSTRAINT recipe_id FOREIGN KEY(recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, recipe_id)
);

/*

INSERT INTO likes (user_id, recipe_id) VALUES ((SELECT id FROM users WHERE name='Dood'), (SELECT id FROM recipes WHERE bean='panama'));

/*


/* 
test queries

FatCat a1911c9b-1548-438b-9656-d95489f4309d

ethiopia f3712afd-1021-4dde-9086-432a4d1bec0a

burundi f8c1b570-0af6-43bb-b020-b8c3ad3b75f4



Dood  3cf1f24e-ebdb-4e39-b0c6-5102e18e3a5e

kenya b3cb2acc-69b8-464e-ae4b-b511b277a9ef

*/


-- selects FatCats Journals and returns these attributes from them
SELECT Journals.id, user_id, bean, region, roaster, "date", "name" FROM Journals LEFT JOIN Users ON user_id = Users.id WHERE Users.id = 'a1911c9b-1548-438b-9656-d95489f4309d';

-- gets all the user journals and user info
SELECT * FROM journals LEFT JOIN Users ON user_id = Users.id WHERE Users.id = 'b5ca3e9a-3104-4690-9030-217766827477';

-- gets just user journals
SELECT * FROM journals WHERE user_id = 'b5ca3e9a-3104-4690-9030-217766827477';

-- select a journal entry and all its shots

-- gets a column and groups the number of times it repeats in a table

SELECT user_id, COUNT(*) FROM Journals WHERE user_id = (SELECT id FROM Users WHERE name='FatCat') GROUP BY user_id;