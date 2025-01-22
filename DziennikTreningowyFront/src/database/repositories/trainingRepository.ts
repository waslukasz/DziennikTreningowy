import { db } from "../databaseSettings";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
export async function getLastTraining() {
  const result = await db.getFirstAsync<Training>(
    `SELECT * FROM Trainings ORDER BY timestamp DESC LIMIT 1`
  );
  return result;
}

export async function getAllTraingins() {
  const result = await db.getAllAsync<Training>("SELECT * FROM Trainings");
  return result;
}
export async function getTrainingById(id: string) {
  const result = await db.getFirstAsync<Training>(
    "SELECT * FROM Trainings WHERE id = $value",
    { $value: id }
  );
  return result;
}
export async function getTrainingsByDate(timestamp: Date) {
  try {
    const dateToString = timestamp.toISOString().split("T")[0];
    const result = await db.getAllAsync<Training>(
      "SELECT * FROM Trainings where DATE(timestamp) BETWEEN $value AND $value",
      { $value: dateToString }
    );
    return result;
  } catch (error) {
    return false;
  }
}
export async function getTrainingIdInDateRange(from: Date, to: Date) {
  try {
    const fromDate = from.toISOString().split("T")[0];
    const toDate = to.toISOString().split("T")[0];
    const result = await db.getAllAsync<Training>(
      "SELECT id FROM Trainings WHERE DATE(timestamp) BETWEEN ? AND ?",
      [fromDate, toDate]
    );
    return result;
  } catch (error) {
    console.log("getTrainingIdInDateRange training issue");
    return false;
  }
}
export async function getTraingsInDateRange(from: Date, to: Date) {
  try {
    const fromDate = from.toISOString().split("T")[0];
    const toDate = to.toISOString().split("T")[0];
    const result = await db.getAllAsync<Training>(
      "SELECT * FROM Trainings WHERE DATE(timestamp) BETWEEN ? AND ?",
      [fromDate, toDate]
    );
    return result;
  } catch (error) {
    console.log("getInDateRange training issue");
    return false;
  }
}
export async function createTraining(date: Date) {
  try {
    const guidId=uuidv4();
    const dateToString = date.toISOString();
    const result = await db.runAsync(
      `INSERT INTO Trainings (id, timestamp) VALUES (?, ?)`,
      [guidId, dateToString]
    );
    if (result.changes && result.changes > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("create training issue");
    return false;
  }
}
export async function deleteTraining(id: string) {
  try {
    const result = await db.runAsync(
      "DELETE FROM Trainings WHERE id = $value",
      { $value: id }
    );
    if (result.changes && result.changes > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("delete training issue");
    return false;
  }
}
export async function updateTraining(training: Training) {
  try {
    const dateToString = training.timestamp.toISOString();
    const result = await db.runAsync(
      "UPDATE Trainings SET timestamp = ? WHERE id = ?",
      [dateToString, training.id]
    );
    if (result.changes && result.changes > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("update training issue");
    return false;
  }
}
export async function isTrainingCompleted(
  trainingId: string
): Promise<boolean> {
  try {
    const result = await db.getFirstAsync<{ isTrainingDone: number }>(
      `
      SELECT CASE 
        WHEN COUNT(*) = SUM(isDone) THEN 1 
        ELSE 0 
      END AS isTrainingDone
      FROM Exercises
      WHERE trainingId = $trainingId
      `,
      { $trainingId: trainingId }
    );

    return result?.isTrainingDone === 1;
  } catch (error) {
    console.log("isTrainingCompleted issue", error);
    return false;
  }
}
