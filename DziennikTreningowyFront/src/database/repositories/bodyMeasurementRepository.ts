import { BodyMeasurements } from "../../types/bodyMeasurementsType";
import { BodyPartEnum } from "../../types/bodyPartEnum";
import { db } from "../databaseSettings";

export async function getAllBodyMeasurements() {
  const result = await db.getAllAsync<BodyMeasurements>(
    //"SELECT * FROM BodyMeasurements ORDER BY measurementDate DESC LIMIT 10"
    "SELECT * FROM BodyMeasurements"
  );
  return result;
}

export async function createBodyMeasurements(measurements: BodyMeasurements) {
  const { date, bodyPart, value } = measurements;
  if (date) {
    const result = await db.runAsync(
      `
            INSERT INTO BodyMeasurements (date, bodyPart, value)
            VALUES (?,?,?)
            `,
      [date.toISOString(), bodyPart, value]
    );
    return result;
  }
  const result = await db.runAsync(
    `
        INSERT INTO BodyMeasurements (bodyPart, value)
        VALUES (?, ?)
        `,
    [bodyPart, value]
  );
  return result;
}
export async function getBodyMeasurementsByBodyType(bodyPart: BodyPartEnum) {
  const result = await db.getFirstAsync<BodyMeasurements>(
    "SELECT * FROM BodyMeasurements WHERE bodyType = ?",
    [bodyPart]
  );
  return result;
}

export async function getBodyMeasurementsById(id: number) {
  const result = await db.getFirstAsync<BodyMeasurements>(
    "SELECT * FROM BodyMeasurements WHERE id = ?",
    [id]
  );
  return result;
}

export async function deleteBodyMeasurements(id: number) {
  const result = await db.runAsync(
    "DELETE FROM BodyMeasurements WHERE id = ?",
    [id]
  );
  return result;
}

export async function updateBodyMeasurements(measurements: BodyMeasurements) {
  const { id, date, bodyPart, value } = measurements;
  if (date == undefined) {
    console.log("error");
    return;
  } else {
    const result = await db.runAsync(
      `
            UPDATE BodyMeasurements 
            SET date = ?, bodyPart = ?, value = ?
            WHERE id = ?
            `,
      [date.toISOString(), bodyPart, value, id!]
    );
    return result;
  }
}
