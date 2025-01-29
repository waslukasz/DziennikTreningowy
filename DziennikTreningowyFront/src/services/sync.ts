import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../axios/axios";
import { BodyMeasurements } from "../types/bodyMeasurementsType";

export async function synchronize(lastSync?: string|null) {
  console.log(lastSync ? "Synchronizing with lastSync" : "Synchronizing");

  try {
    const response = await api.get("/api/sync", {
      params: lastSync ? { lastSync } : undefined,
    });

    console.log("Synchronization successful:", response.data);

    return response.data;
  } catch (error) {
    console.error("Synchronization failed:", error);
    throw error;
  }
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
    payload.exercises = exercises.map(exercise => ({
      ...exercise,
      isDone: !!exercise.isDone
    }));
  }
  if (measurements && measurements.length > 0) {
    payload.measurements = measurements;
  }
  if (profile) {
    payload.profile = profile;
  }
  console.log(payload)
  try {
    const response = await api.post("/api/sync", payload);
    if (response.status == 200) {
      AsyncStorage.setItem("lastSync", new Date().toISOString());
    }
    console.log("Data saved successfully:", response.data);
  } catch (error) {
    console.error("Error saving data:", error);
  }
}
