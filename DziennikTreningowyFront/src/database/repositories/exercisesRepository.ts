import { SQLiteDatabase } from "expo-sqlite";
export async function getAllExercises(db: SQLiteDatabase, trainingId: number) {
  const result = await db.getAllAsync<Exercise>(
    "SELECT * FROM Exercises WHERE trainingId = $value",
    { $value: trainingId }
  );
  return result;
}
export async function countExercisesInTraining(db:SQLiteDatabase,trainingId:number){
  interface CountResult {
    count: number;
  }
  const result: CountResult | null = await db.getFirstAsync(
    "SELECT COUNT(*) as count FROM Exercises WHERE trainingId = $value",
    { $value: trainingId }
  );

  if (result && typeof result.count === 'number') {
    return result.count;
  }
}
export async function getExerciseById(db: SQLiteDatabase, id: number) {
  const result = await db.getFirstAsync<Exercise>(
    "SELECT * FROM Exercises WHERE id = $value",
    { $value: id }
  );
  return result;
}
export async function createExercise(db: SQLiteDatabase, exercise: Exercise) {
  const { name, description, weight, repetitions, sets, duration, trainingId } =
    exercise;
  const result = await db.runAsync(
    `
        INSERT INTO Exercises (name, description, weight, repetitions, sets, duration, trainingId)
        VALUES (?, ?, ?, ?,?, ?, ?)
    `,
    [
      name,
      description||null,
      weight || null,
      repetitions || null,
      sets || null,
      duration||null,
      trainingId,
    ]
  );
  return result;
}

export async function deleteExercise(db: SQLiteDatabase, id: number) {
  const result = await db.runAsync("DELETE FROM Exercises WHERE id = $value", {
    $value: id,
  });
  return result;
}

export async function updateExercise(db: SQLiteDatabase, exercise: Exercise) {
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
      description||null,
      weight || null,
      repetitions || null,
      sets || null,
      duration||null,
      trainingId,
      id!,
    ]
  );
  return result;
}