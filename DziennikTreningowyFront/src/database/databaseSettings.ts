import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
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
            name TEXT CHECK(LENGTH(name) <= 30),
            description TEXT CHECK(LENGTH(Description) <= 30),
            weight INTEGER,
            repetitions INTEGER,
            sets INTEGER,
            duration TEXT,
            trainingId INTEGER,
            timestamp TEXT DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%S', 'NOW')),
            FOREIGN KEY (trainingId) REFERENCES trainings(Id)
            );
        CREATE TABLE IF NOT EXISTS Trainings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT DEFAULT (STRFTIME('%Y-%m-%d %H:%M:%S', 'NOW'))
        );
        CREATE TABLE IF NOT EXISTS BodyMeasurements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            measurementDate TEXT DEFAULT (STRFTIME('%Y-%m-%d %H %M %S', 'NOW')),
            neck INTEGER,
            belly INTEGER,
            chest INTEGER,
            hips INTEGER,
            bicep INTEGER,
            thigh INTEGER,
            waist INTEGER,
            calf INTEGER,
            bodyWeight INTEGER
        );
       `);
      currentDbVersion = 1;
    }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
export default async function DropDatabase(db:SQLiteDatabase) {
  await db.execAsync(`
    DROP TABLE IF EXISTS Exercises;
    DROP TABLE IF EXISTS Trainings;
    DROP TABLE IF EXISTS BodyMeasurements;
  `);
}
