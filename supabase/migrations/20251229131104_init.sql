CREATE TABLE word_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  word_category_id INTEGER NOT NULL
);

CREATE TABLE lines (
  id SERIAL PRIMARY KEY,
  template TEXT NOT NULL,
  word_category_id INTEGER NOT NULL
);
