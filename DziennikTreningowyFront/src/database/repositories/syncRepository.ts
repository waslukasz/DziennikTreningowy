import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllTraingins } from "./trainingRepository";
import { db } from "../databaseSettings";
import { saveData } from "../../services/sync";
import { BodyMeasurements } from "../../types/bodyMeasurementsType";

export async function dataToSync() {
  try {
    const traingings = await getTrainingsToSync();
    const exercises = await getExercisesToSync();
    const measurements = await getMeasurementsToSync();
    const profile = await getProfileToSync();
    const result = await saveData(traingings, exercises, measurements, profile);
  } catch (error) {
    console.log(error);
  }
}
async function getTrainingsToSync() {
  const lastSync = await AsyncStorage.getItem("lastSync");
  if (lastSync) {
    const result = await db.getAllAsync<Training>(
      "SELECT * FROM Trainings WHERE updatedAt > ?",
      [lastSync]
    );
    return result;
  } else {
    const result = await db.getAllAsync<Training>("SELECT * FROM Trainings");
    return result;
  }
}
async function getExercisesToSync() {
  const lastSync = await AsyncStorage.getItem("lastSync");
  if (lastSync) {
    const result = await db.getAllAsync<Exercise>(
      "SELECT * FROM Exercises WHERE updatedAt > ?",
      [lastSync]
    );
    return result; 
  } else {
    const result = await db.getAllAsync<Exercise>("SELECT * FROM Exercises");
    return result;
  }
}
async function getMeasurementsToSync() {
  const lastSync = await AsyncStorage.getItem("lastSync");
  if (lastSync) {
    const result = await db.getAllAsync<BodyMeasurements>(
      "SELECT * FROM BodyMeasurements WHERE updatedAt > ?",
      [lastSync]
    );
    return result;
  } else {
    const result = await db.getAllAsync<BodyMeasurements>(
      "SELECT * FROM BodyMeasurements"
    );
    return result;
  }
}
async function getProfileToSync() {
  const lastSync = await AsyncStorage.getItem("lastSync");
  if (lastSync) {
    const result = await db.getFirstAsync<User>(
      "SELECT * FROM User WHERE updatedAt > ?",
      [lastSync]
    );
    return result;
  } else {
    const result = await db.getFirstAsync<User>("SELECT * FROM User");
    return result;
  }
}
