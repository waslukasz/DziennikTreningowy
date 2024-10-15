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
    belly,
    chest,
    hips,
    bicep,
    thigh,
    waist,
    calf,
    bodyWeight,
  } = measurements;
  if (measurementDate) {
    const result = await db.runAsync(
      `
            INSERT INTO BodyMeasurements (measurementDate, neck, belly, chest, hips, bicep, thigh, waist, calf, bodyWeight)
            VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)
            `,
      [
        measurementDate.toISOString(),
        neck,
        belly,
        chest,
        hips,
        bicep,
        thigh,
        waist,
        calf,
        bodyWeight,
      ]
    );
    return result;
  }
  const result = await db.runAsync(
    `
        INSERT INTO BodyMeasurements (neck, belly, chest, hips, bicep, thigh, waist, calf, bodyWeight)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
    [neck, belly, chest, hips, bicep, thigh, waist, calf, bodyWeight]
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
    belly,
    chest,
    hips,
    bicep,
    thigh,
    waist,
    calf,
    bodyWeight,
  } = measurements;
  if (measurementDate == undefined) {
    console.log("error");
    return;
  } else {
    const result = await db.runAsync(
      `
            UPDATE BodyMeasurements 
            SET measurementDate = ?, neck = ?, belly = ?, chest = ?, hips = ?, bicep = ?, thigh = ?, waist = ?, calf = ?, bodyWeight = ?
            WHERE id = ?
            `,
      [
        measurementDate.toISOString(),
        neck,
        belly,
        chest,
        hips,
        bicep,
        thigh,
        waist,
        calf,
        bodyWeight,
        id!,
      ]
    );
    return result;
  }
}
