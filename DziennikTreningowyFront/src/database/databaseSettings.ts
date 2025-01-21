import * as SQLite from "expo-sqlite";
export const databaseName = "DziennikTreningowy-v1.3";
export const db = SQLite.openDatabaseSync(databaseName);
export async function initDatabase() {
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Exercises (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT CHECK(LENGTH(name) <= 30),
            description TEXT CHECK(LENGTH(Description) <= 30),
            weight INTEGER,
            repetitions INTEGER,
            sets INTEGER,
            duration TEXT,
            trainingId INTEGER,
            timestamp TEXT DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%S', 'NOW')),
            isDone INTEGER DEFAULT 0,
            FOREIGN KEY (trainingId) REFERENCES trainings(Id)
            );
        CREATE TABLE IF NOT EXISTS Trainings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%S', 'NOW'))
        );
        CREATE TABLE IF NOT EXISTS User (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT,
          height INTEGER,
          weight REAL
        );
        CREATE TABLE IF NOT EXISTS BodyMeasurements (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT DEFAULT (STRFTIME('%Y-%m-%d %H %M %S', 'NOW')),
          bodyPart TEXT NOT NULL,
          value INTEGER,
          CHECK (bodyPart IN ('neck', 'belly', 'chest', 'hips', 'bicep', 'thigh', 'waist', 'calf', 'bodyWeight'))
        );`);
}
export async function DropDatabase() {
  await db.execAsync(`
    DROP TABLE IF EXISTS Exercises;
    DROP TABLE IF EXISTS Trainings;
    DROP TABLE IF EXISTS BodyMeasurements;
    Drop TABLE IF EXISTS User;
  `);
}
