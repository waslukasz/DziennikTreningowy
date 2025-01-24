import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../databaseSettings";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { dataToSync } from "./syncRepository";
export async function getAllExercises() {
  const result = await db.getAllAsync<Exercise>(
    "SELECT * FROM Exercises"
  );
  return result;
}
export async function getAllExercisesByTrainingId(trainingId: string) {
  const result = await db.getAllAsync<Exercise>(
    "SELECT * FROM Exercises WHERE trainingId = $value",
    { $value: trainingId }
  );
  return result;
}
export async function countExercisesInTraining(trainingId: string) {
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
export async function getExerciseById(id: string) {
  const result = await db.getFirstAsync<Exercise>(
    "SELECT * FROM Exercises WHERE id = $value",
    { $value: id }
  );
  return result;
}
export async function setDoneStatusInExercise(id: string, isDone: boolean) {
  const isDoneNumber = isDone ? 1 : 0;
  const result = await db.runAsync(
    "UPDATE Exercises SET isDone = $isDoneNumber WHERE id = $value",
    { $value: id,$isDoneNumber:!isDoneNumber }//moze byc blad
  );
  return result;
}
export async function createExercise(exercise: Exercise,isAuthenticate:boolean) {
  try {
    const guidId=uuidv4();
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
    INSERT INTO Exercises (id, name, description, weight, repetitions, sets, duration, trainingId)
    VALUES (? ,?, ?, ?, ?, ?, ?, ?)
    `,
      [
        guidId,
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
      if (isAuthenticate) {
        dataToSync();
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("create exercise issue");
    return false;
  }
}

export async function deleteExercise(id: string,isAuthenticate:boolean) {
  try {
    const result = await db.runAsync(
      "DELETE FROM Exercises WHERE id = $value",
      {
        $value: id,
      }
    );
    if (result.changes && result.changes > 0) {
      if (isAuthenticate) {
        //dataToSync(); zmienic
      }
      return true
    } else {
      return false;
    }
  } catch (error) {
    console.log("delete exercise issue");
    return false;
  }
}

export async function updateExercise(exercise: Exercise,isAuthenticate:boolean) {
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
      isDone,
    } = exercise;
    const result = await db.runAsync(
      `
        UPDATE Exercises 
        SET name = ?, description = ?, weight = ?, repetitions = ?,sets=?, duration = ?, trainingId = ?, isDone=?
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
        isDone ? 1 : 0,
        id!,
      ]
    );
    if (result.changes && result.changes > 0) {
      if (isAuthenticate) {
        dataToSync();
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("update exercise issue");
    return false;
  }
}
export async function getExercisesToSync() {
  const lastSync=await AsyncStorage.getItem("lastSync");
  if(lastSync){
    const result=await db.getAllAsync<Exercise>(
      "SELECT * FROM Exercises WHERE updatedAt > ?",
      [lastSync]
    );
    return result
  }else{
    const result=await getAllExercises();
    return result
  }
}