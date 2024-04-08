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

// Create 'contacts' table
const createContactsTable = () => {
  const sqlContacts = `CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phoneNumber TEXT NOT NULL,
    address TEXT NOT NULL,
    profileImageId TEXT,
    FOREIGN KEY (profileImageId) REFERENCES images(id)
  )`;

  db.run(sqlContacts, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Table 'contacts' has been created.");
    }
  });
};

// Create 'images' table
const createImagesTable = () => {
  const sqlImages = `CREATE TABLE IF NOT EXISTS images (
    id TEXT PRIMARY KEY NOT NULL,
    image BLOB NOT NULL
  )`;

  db.run(sqlImages, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Table 'images' has been created.");
    }
  });
};

// Create contacts and images tables
createContactsTable();
createImagesTable();

export default db;
