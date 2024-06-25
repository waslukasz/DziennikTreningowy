import { SQLiteDatabase } from "expo-sqlite";

export async function getAllBodyMeasurements(db: SQLiteDatabase) {
  const result = await db.getAllAsync<BodyMeasurements>(
    "SELECT * FROM BodyMeasurements"
  );
  return result;
}

export async function createBodyMeasurements(
  db: SQLiteDatabase,
  measurements: BodyMeasurements
) {
  const {
    measurementDate,
    neck,
    abdomen,
    chest,
    hips,
    bicep,
    thigh,
    waist,
    calf,
  } = measurements;
  if (measurementDate) {
    const result = await db.runAsync(
      `
            INSERT INTO BodyMeasurements (measurementDate, neck, abdomen, chest, hips, bicep, thigh, waist, calf)
            VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)
            `,
      [
        measurementDate.toISOString(),
        neck,
        abdomen,
        chest,
        hips,
        bicep,
        thigh,
        waist,
        calf,
      ]
    );
    return result;
  }
  const result = await db.runAsync(
    `
        INSERT INTO BodyMeasurements (neck, abdomen, chest, hips, bicep, thigh, waist, calf)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
    [neck, abdomen, chest, hips, bicep, thigh, waist, calf]
  );
  return result;
}

export async function getBodyMeasurementsById(db: SQLiteDatabase, id: number) {
  const result = await db.getFirstAsync<BodyMeasurements>(
    "SELECT * FROM BodyMeasurements WHERE id = ?",
    [id]
  );
  return result;
}

export async function deleteBodyMeasurements(db: SQLiteDatabase, id: number) {
  const result = await db.runAsync(
    "DELETE FROM BodyMeasurements WHERE id = ?",
    [id]
  );
  return result;
}

export async function updateBodyMeasurements(
  db: SQLiteDatabase,
  measurements: BodyMeasurements
) {
  const {
    id,
    measurementDate,
    neck,
    abdomen,
    chest,
    hips,
    bicep,
    thigh,
    waist,
    calf,
  } = measurements;
  if (measurementDate == undefined) {
    console.log("error");
    return;
  } else {
    const result = await db.runAsync(
      `
            UPDATE BodyMeasurements 
            SET measurementDate = ?, neck = ?, abdomen = ?, chest = ?, hips = ?, bicep = ?, thigh = ?, waist = ?, calf = ?
            WHERE id = ?
            `,
      [
        measurementDate.toISOString(),
        neck,
        abdomen,
        chest,
        hips,
        bicep,
        thigh,
        waist,
        calf,
        id!,
      ]
    );
    return result;
  }
}
