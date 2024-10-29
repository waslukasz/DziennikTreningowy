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
  try {
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
    if (result.changes && result.changes > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("create BodyMeasurements issue");
    return false;
  }
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
  try {
    const result = await db.runAsync(
      "DELETE FROM BodyMeasurements WHERE id = ?",
      [id]
    );
    if (result.changes && result.changes > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("delete BodyMeasurements issue");
    return false;
  }
}

export async function updateBodyMeasurements(measurements: BodyMeasurements) {
  try {
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
        [new Date(date).toISOString(), bodyPart, value, id!]
      );
      if (result.changes && result.changes > 0) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log("update BodyMeasurements issue" + error);
    return false;
  }
}
