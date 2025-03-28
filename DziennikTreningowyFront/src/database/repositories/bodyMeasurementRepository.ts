import { saveData } from "../../services/sync";
import { BodyMeasurements } from "../../types/bodyMeasurementsType";
import { BodyPartEnum } from "../../types/bodyPartEnum";
import { db } from "../databaseSettings";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { createToDelete } from "./toDeleteRepository";
export async function getAllBodyMeasurements() {
  const result = await db.getAllAsync<BodyMeasurements>(
    //"SELECT * FROM BodyMeasurements ORDER BY measurementDate DESC LIMIT 10"
    "SELECT * FROM BodyMeasurements"
  );
  return result;
}

export async function getLastMeasurement() {
  const result = await db.getFirstAsync<BodyMeasurements>(
    "SELECT * FROM BodyMeasurements ORDER BY date DESC LIMIT 1"
  );
  return result;
}

export async function createBodyMeasurements(measurements: BodyMeasurements,isAuthenticate:boolean) {
  try {
    const guidId = uuidv4();
    const { date, bodyPart, value } = measurements;
    
    const result = await db.runAsync(
      `
      INSERT INTO BodyMeasurements (id, date, bodyPart, value)
      VALUES (?, ?, ?, ?)
      `,
      [
        guidId,
        date ? date.toISOString() : new Date().toISOString(),
        bodyPart,
        value,
      ]
    );
    
    if (result.changes && result.changes > 0) {
      if (isAuthenticate) {
        saveData();
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("create BodyMeasurements issue:", error);
    return false;
  }
}

export async function getBodyMeasurementsByBodyType(bodyPart: BodyPartEnum) {
  const result = await db.getFirstAsync<BodyMeasurements>(
    "SELECT * FROM BodyMeasurements WHERE bodyPart = ?",
    [bodyPart]
  );
  return result;
}

export async function getBodyMeasurementsById(id: string) {
  const result = await db.getFirstAsync<BodyMeasurements>(
    "SELECT * FROM BodyMeasurements WHERE id = ?",
    [id]
  );
  return result;
}

export async function deleteBodyMeasurements(
  id: string,
  isAuthenticate: boolean
) {
  try {
    const result = await db.runAsync(
      "DELETE FROM BodyMeasurements WHERE id = ?",
      [id]
    );
    if (result.changes && result.changes > 0) {
      await createToDelete(id,"measurement");
      if (isAuthenticate) {
         saveData();
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("delete BodyMeasurements issue");
    return false;
  }
}

export async function updateBodyMeasurements(
  measurements: BodyMeasurements,
  isAuthenticate: boolean
) {
  try {
    const { id, date, bodyPart, value } = measurements;
    const updatedAt = new Date().toISOString();
    if (date == undefined) {
      console.log("error");
      return;
    } else {
      const result = await db.runAsync(
        `
        UPDATE BodyMeasurements 
        SET date = ?, bodyPart = ?,updatedAt = ?, value = ?
        WHERE id = ?
        `,
        [new Date(date).toISOString(), bodyPart,updatedAt, value, id!]
      );
      console.log(result.changes)
      if (result.changes && result.changes > 0) {
        if (isAuthenticate) {
          saveData();
        }
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
