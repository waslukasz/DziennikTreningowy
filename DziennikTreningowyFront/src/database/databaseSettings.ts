import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
export const databaseName = "DziennikTreningowy-v1.8";
export const db = SQLite.openDatabaseSync(databaseName);
export async function initDatabase() {
  await db.execAsync("PRAGMA foreign_keys = ON;");
  await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Exercises (
            id TEXT PRIMARY KEY,
            name TEXT CHECK(LENGTH(name) <= 30),
            weight INTEGER,
            repetitions INTEGER,
            sets INTEGER,
            trainingId TEXT,
            timestamp TEXT DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%SZ', 'NOW')),
            updatedAt TEXT DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
            isDone INTEGER DEFAULT 0,
            FOREIGN KEY (trainingId) REFERENCES trainings(Id) ON DELETE CASCADE
            );
        CREATE TABLE IF NOT EXISTS Trainings (
            id TEXT PRIMARY KEY,
            updatedAt TEXT DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
            timestamp TEXT DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%S', 'NOW'))
        );
        CREATE TABLE IF NOT EXISTS User (
          id TEXT PRIMARY KEY,
          firstName TEXT,
          height INTEGER,
          updatedAt TEXT DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
          weight REAL
        );
        CREATE TABLE IF NOT EXISTS ToDelete (
          id TEXT PRIMARY KEY,
          type TEXT CHECK(type IN ('training', 'exercise', 'measurement'))
          );
        CREATE TABLE IF NOT EXISTS BodyMeasurements (
          id TEXT PRIMARY KEY,
          date TEXT DEFAULT (STRFTIME('%Y-%m-%d %H %M %S', 'NOW')),
          bodyPart TEXT NOT NULL,
          value INTEGER,
          updatedAt TEXT DEFAULT (STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')),
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
export async function deleteAllData() {
  try {
    AsyncStorage.clear();
    await db.runAsync("DELETE FROM Trainings");
    await db.runAsync("DELETE FROM Exercises");
    await db.runAsync("DELETE FROM BodyMeasurements");
    await db.runAsync("DELETE FROM User");
    await db.runAsync("DELETE FROM ToDelete");
    console.log("All data has been deleted.");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
