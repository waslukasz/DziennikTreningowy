import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
export async function initDatabase(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  if (result !== null) {
    let { user_version: currentDbVersion } = result;

    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }
    if (currentDbVersion === 0) {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS Exercises (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL CHECK(LENGTH(name) <= 30),
            description TEXT NOT NULL CHECK(LENGTH(Description) <= 30),
            weight INTEGER,
            repetitions INTEGER,
            duration TEXT,
            trainingId INTEGER,
            timestamp TEXT DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%S', 'NOW')),
            FOREIGN KEY (trainingId) REFERENCES trainings(Id)
            );
        CREATE TABLE IF NOT EXISTS Trainings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT DEFAULT (STRFTIME('%Y-%m-%d', 'NOW'))
        );
        INSERT INTO Trainings (timestamp) VALUES 
            (STRFTIME('%Y-%m-%d', 'NOW')),
            (STRFTIME('%Y-%m-%d', 'NOW', '-1 day')),
            (STRFTIME('%Y-%m-%d', 'NOW', '-2 days'));

        `);
      currentDbVersion = 1;
    }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
