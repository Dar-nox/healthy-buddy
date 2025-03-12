import * as SQLite from "expo-sqlite";

// Open (or create) database
const db = SQLite.openDatabase("healthyBuddy.db");

// Function to create tables
export function createTables() {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        level INTEGER DEFAULT 1
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS quests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT 0
      );`
    );
  });
}

// Function to insert a user
export function addUser(name: string) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO users (name) VALUES (?);",
      [name],
      (_, result) => console.log("User added:", result.insertId),
      (_, error) => console.error("Error adding user:", error)
    );
  });
}

// Function to fetch users
export function getUsers(callback: (users: any[]) => void) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM users;",
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.error("Error fetching users:", error)
    );
  });
}

export default db;
