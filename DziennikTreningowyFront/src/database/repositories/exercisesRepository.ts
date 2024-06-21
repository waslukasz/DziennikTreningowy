import { SQLiteDatabase } from "expo-sqlite";
export async function getAllExercises(db: SQLiteDatabase, trainingId: number) {
    const result = await db.getAllAsync<Exercise>('SELECT * FROM Exercises WHERE trainingId = $value', { $value: trainingId });
    return result;
}

export async function getExerciseById(db: SQLiteDatabase, id: number) {
    const result = await db.getFirstAsync<Exercise>('SELECT * FROM Exercises WHERE id = $value', { $value: id });
    return result;
}
export async function createExercise(db: SQLiteDatabase, exercise: Exercise) {
    const { name, description, weight, repetitions, duration, trainingId } = exercise;
    const result = await db.runAsync(`
        INSERT INTO Exercises (name, description, weight, repetitions, duration, trainingId)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [name, description, weight || null, repetitions || null, duration, trainingId]);
    return result;
}

export async function deleteExercise(db: SQLiteDatabase, id: number) {
    const result = await db.runAsync('DELETE FROM Exercises WHERE id = $value', { $value: id });
    return result;
}

export async function updateExercise(db: SQLiteDatabase, exercise: Exercise) {
    const { id, name, description, weight, repetitions, duration, trainingId } = exercise;
    const result = await db.runAsync(`
        UPDATE Exercises 
        SET name = ?, description = ?, weight = ?, repetitions = ?, duration = ?, trainingId = ?
        WHERE id = ?
    `, [name, description, weight || null, repetitions || null, duration, trainingId, id!]);
    return result;
}