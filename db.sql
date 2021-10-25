CREATE DATABASE espresso;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
  name TEXT CONSTRAINT name_check CHECK (char_length(name) <= 15) NOT NULL UNIQUE,
  email TEXT CONSTRAINT email_check CHECK (char_length(email) <= 254) NOT NULL UNIQUE,
  password TEXT CONSTRAINT password_check CHECK (char_length(password) <= 128) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE journals (
  id UUID DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
  bean TEXT CONSTRAINT bean_check CHECK (char_length(bean) <= 32) NOT NULL,
  region TEXT CONSTRAINT region_check CHECK (char_length(region) <= 32) NOT NULL,
  roaster TEXT CONSTRAINT name_check CHECK (char_length(roaster) <= 32) NOT NULL,
  postDate DATE DEFAULT CURRENT_DATE,
  postTime TIME DEFAULT CURRENT_TIME,
  PRIMARY KEY (id),
  user_id uuid NOT NULL,
  CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

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
  process TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE likes (
  CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL,
  PRIMARY KEY (user_id, recipe_id),
  CONSTRAINT recipe_id FOREIGN KEY(recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE TABLE admins (
  name TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  PRIMARY KEY (name)
);

CREATE TABLE reports (
  recipe_id UUID UNIQUE NOT NULL,
  count INTEGER DEFAULT 1,
  users DATA TYPE uuid[] DEFAULT array[]::uuid[],
  PRIMARY KEY (recipe_id),
  CONSTRAINT recipe_id FOREIGN KEY(recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);