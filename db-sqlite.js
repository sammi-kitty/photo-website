import sqlite3 from "sqlite3"
import { open } from "sqlite"

const db = await open ({
    filename: process.env.DATABASE_FILE || "./database.sqlite",
    driver: sqlite3.Database,
})

await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    password VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

const userCount = await db.get(`SELECT COUNT(*) AS count FROM users`);
if (userCount.count === 0) {
    await db.run(`
        INSERT INTO users (name, password)
        VALUES (?, ?)`, 
        `Admin`,
        `$2b$10$81q24l/eCij8CPafoQW6XOFQkVZUJhm0mNGNFvOs211Ad69J.X7Iu`
    );
}

export default db;