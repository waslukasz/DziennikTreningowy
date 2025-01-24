import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../axios/axios";
import { BodyMeasurements } from "../types/bodyMeasurementsType";

export async function synchronize() {
  const response = await api.get("/api/sync");
  return response.data;
}
export async function synchronizeWithLastSync(lastSync: Date) {
  const response = await api.get("/api/sync");
  //toDo
}
export async function saveData(
  trainings?: Training[],
  exercises?: Exercise[],
  measurements?: BodyMeasurements[],
  profile?: User | null
) {
  if (
    (!trainings || trainings.length === 0) &&
    (!exercises || exercises.length === 0) &&
    (!measurements || measurements.length === 0) &&
    !profile
  ) {
    console.log("No data to save");
    return;
  }

  const payload: Record<string, unknown> = {};
  if (trainings && trainings.length > 0) {
    payload.trainings = trainings;
  }
  if (exercises && exercises.length > 0) {
    payload.exercises = exercises;
  }
  if (measurements && measurements.length > 0) {
    payload.measurements = measurements;
  }
  if (profile) {
    payload.profile = profile;
  }
  try {
    const response = await api.post("/api/save", payload);
    if(response.status==200){
      AsyncStorage.setItem("lastSync",new Date().toISOString())
    }
    console.log("Data saved successfully:", response.data);
  } catch (error) {
    console.error("Error saving data:", error);
  }
}
