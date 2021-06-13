-- Thing To Think about....

/*
    -- VARCHAR BAD!!!! --
    replace some { someColumn varchar(n) } with...
        { someColumn text CONSTRAINT namechk CHECK (char_length(name) <= 255) }

*/

CREATE DATABASE espressoTest;

CREATE EXTENSION IF NOT EXISTS uuid_ossp;

CREATE TABLE Users (
  id uuid DEFAULT uuid_generate_v4(),
  "name" VARCHAR(100),
  email VARCHAR(100),
  "password" VARCHAR(100),
  PRIMARY KEY (id)
);

--DROP TABLE IF EXISTS Users; 
/*
INSERT INTO Users("name", email, "password") VALUES('FatCat', 'fatcat@gmail.com', 'badpass');
INSERT INTO Users("name", email, "password") VALUES('Dood', 'thedood@gmail.com', '1234');
*/

CREATE TABLE Journals (
  id uuid DEFAULT uuid_generate_v4(),
  bean VARCHAR(100),
  region VARCHAR(100),
  roaster VARCHAR(100),
  "date" DATE,
  PRIMARY KEY (id),
  user_id uuid,
  CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE
);

/*
INSERT INTO Journals(bean, region, roaster, "date", user_id) VALUES('ethiopia', 'agaro', 'buddy brew', '2021-06-08', (SELECT id FROM Users WHERE name='FatCat'));
INSERT INTO Journals(bean, region, roaster, "date", user_id) VALUES('burundi', 'mutana', 'buddy brew', '2021-06-12', (SELECT id FROM Users WHERE name='FatCat'));
INSERT INTO Journals(bean, region, roaster, "date", user_id) VALUES('kenya', 'yayahayu', 'kuma', '2021-06-10', (SELECT id FROM Users WHERE name='Dood'));
*/


--instead of order column, set it as TIMESTAMP and record time then you can sort by time and date instead of order and date
CREATE TABLE Shots (
  "order" SMALLINT,
  journal_id uuid,
  CONSTRAINT journal_id FOREIGN KEY(journal_id) REFERENCES Journals(id) ON DELETE CASCADE,
  dose SMALLINT,
  yield SMALLINT,
  "time" SMALLINT,
  grind SMALLINT,
  notes VARCHAR,
  attribute VARCHAR,
  PRIMARY KEY ("order", journal_id)
);

/*
INSERT INTO Shots("order", journal_id, dose, yield, "time", grind, notes, attribute) 
VALUES('1', (SELECT id FROM Journals WHERE bean='ethiopia'), 18, 38, 30, 5, 'good', 'balanced');

INSERT INTO Shots("order", journal_id, dose, yield, "time", grind, notes, attribute) 
VALUES('2', (SELECT id FROM Journals WHERE bean='ethiopia'), 20, 36, 22, 8, 'bad', 'sour');

INSERT INTO Shots("order", journal_id, dose, yield, "time", grind, notes, attribute) 
VALUES('1', (SELECT id FROM Journals WHERE bean='burundi'), 18, 39, 28, 4, 'good', 'balanced');

INSERT INTO Shots("order", journal_id, dose, yield, "time", grind, notes, attribute) 
VALUES('1', (SELECT id FROM Journals WHERE bean='kenya'), 19, 42, 32, 10, 'good', 'bitter');
*/

CREATE TABLE recipes (
  id UUID,
  user_id UUID,
  bean TEXT,
  roaster TEXT,
  region TEXT,
  roasted DATE,
  posted DATE,
  dose SMALLINT,
  yield SMALLINT,
  time SMALLINT,
  grind SMALLINT,
  grinder TEXT,
  machine TEXT,
  tasting_notes TEXT,
  log_notes TEXT,
  roast TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE likes (
  user_id UUID,
  recipe_id UUID,
  PRIMARY KEY (user_id, recipe_id)
);


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

SELECT * FROM Journals LEFT JOIN Users ON user_id = Users.id WHERE Users.id = 'a1911c9b-1548-438b-9656-d95489f4309d';

-- gets a column and groups the number of times it repeats in a table

SELECT user_id, COUNT(*) FROM Journals WHERE user_id = (SELECT id FROM Users WHERE name='FatCat') GROUP BY user_id;