import sqlite3 from "sqlite3";
import path from "path";

// Enable verbose mode to get detailed information about the database operations
sqlite3.verbose();

const dbPath = path.resolve(process.cwd(), "src", "data", "test.db");

const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  }
);

const sql = `CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    address TEXT NOT NULL
  )`;

db.run(sql, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Table 'contacts' has been created.");
  }
});

export default db;
