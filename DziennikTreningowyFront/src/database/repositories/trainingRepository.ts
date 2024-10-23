import { db } from "../databaseSettings";

export async function getAllTraingins() {
  const result = await db.getAllAsync<Training>("SELECT * FROM Trainings");
  return result;
}
export async function getTrainingById(id: number) {
  const result = await db.getFirstAsync<Training>(
    "SELECT * FROM Trainings WHERE id = $value",
    { $value: id }
  );
  return result;
}
export async function getTrainingsByDate(timestamp: Date) {
  try {
    const dateToString = timestamp.toISOString();
    const result = await db.getAllAsync<Training>(
      "SELECT * FROM Trainings where timestamp=$value",
      { $value: dateToString }
    );
    return result;
  } catch (error) {
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
    const dateToString = date.toISOString();
    const result = await db.runAsync(
      `INSERT INTO Trainings (timestamp) VALUES ('${dateToString}')`
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
export async function deleteTraining(id: number) {
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
