import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(
  new URL('.', import.meta.url).pathname,
  './database.sqlite'
);

export const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
        return;
    } else {
        console.log('Connected to SQLite database');
    }

    db.run(`
        CREATE TABLE IF NOT EXISTS invites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE,
            phone TEXT UNIQUE,
            accepted BOOLEAN DEFAULT FALSE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating invites table:', err);
        } else {
            console.log('Invites table ready');
        }
    });
});