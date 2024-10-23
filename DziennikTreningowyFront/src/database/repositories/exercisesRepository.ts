import { db } from "../databaseSettings";

export async function getAllExercises(trainingId: number) {
  const result = await db.getAllAsync<Exercise>(
    "SELECT * FROM Exercises WHERE trainingId = $value",
    { $value: trainingId }
  );
  return result;
}
export async function countExercisesInTraining(trainingId: number) {
  interface CountResult {
    count: number;
  }
  const result: CountResult | null = await db.getFirstAsync(
    "SELECT COUNT(*) as count FROM Exercises WHERE trainingId = $value",
    { $value: trainingId }
  );

  if (result && typeof result.count === "number") {
    return result.count;
  }
}
export async function getExerciseById(id: number) {
  const result = await db.getFirstAsync<Exercise>(
    "SELECT * FROM Exercises WHERE id = $value",
    { $value: id }
  );
  return result;
}
export async function createExercise(exercise: Exercise) {
  try {
    const {
      name,
      description,
      weight,
      repetitions,
      sets,
      duration,
      trainingId,
    } = exercise;
    const result = await db.runAsync(
      `
    INSERT INTO Exercises (name, description, weight, repetitions, sets, duration, trainingId)
    VALUES (?, ?, ?, ?,?, ?, ?)
    `,
      [
        name,
        description || null,
        weight || null,
        repetitions || null,
        sets || null,
        duration || null,
        trainingId,
      ]
    );
    if (result.changes && result.changes > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("create exercise issue");
    return false;
  }
}

export async function deleteExercise(id: number) {
  try {
    const result = await db.runAsync(
      "DELETE FROM Exercises WHERE id = $value",
      {
        $value: id,
      }
    );
    if (result.changes && result.changes > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("delete exercise issue");
    return false;
  }
}

export async function updateExercise(exercise: Exercise) {
  try {
    const {
      id,
      name,
      description,
      weight,
      repetitions,
      sets,
      duration,
      trainingId,
    } = exercise;
    const result = await db.runAsync(
      `
        UPDATE Exercises 
        SET name = ?, description = ?, weight = ?, repetitions = ?,sets=?, duration = ?, trainingId = ?
        WHERE id = ?
    `,
      [
        name,
        description || null,
        weight || null,
        repetitions || null,
        sets || null,
        duration || null,
        trainingId,
        id!,
      ]
    );
    if (result.changes && result.changes > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("update exercise issue");
    return false;
  }
}
