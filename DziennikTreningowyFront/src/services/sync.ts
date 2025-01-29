import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../axios/axios";
import { BodyMeasurements } from "../types/bodyMeasurementsType";
import {
  dataToSync,
  saveSyncedData,
} from "../database/repositories/syncRepository";
import { SyncData } from "../types/syncDataType";

export async function synchronize(lastSync?: string | null) {
  try {
    const response = await api.get("/api/sync", {
      params: lastSync ? { lastSync } : undefined,
    });
    const { trainings, exercises, measurements, profile } = response.data;
    saveSyncedData(trainings, exercises, measurements, profile);
    return response.data;
  } catch (error) {
    console.error("Synchronization failed:", error);
    throw error;
  }
}
export async function saveData() {
  try {
    const data = await dataToSync();

    if (!data) {
      AsyncStorage.setItem("lastSync", new Date().toISOString());
      console.log("No data to save");
      return;
    }

    const { trainings, exercises, measurements, profile, toDelete } = data;

    if (
      (!trainings || trainings.length === 0) &&
      (!exercises || exercises.length === 0) &&
      (!measurements || measurements.length === 0) &&
      !profile &&
      (!toDelete || toDelete.length === 0)
    ) {
      AsyncStorage.setItem("lastSync", new Date().toISOString());
      console.log("No data to save");
      return;
    }

    const payload: Record<string, unknown> = {};

    if (trainings?.length) {
      payload.trainings = trainings;
    }

    if (exercises?.length) {
      payload.exercises = exercises.map((exercise) => ({
        ...exercise,
        isDone: !!exercise.isDone,
      }));
    }

    if (measurements?.length) {
      payload.measurements = measurements;
    }

    if (profile) {
      payload.profile = profile;
    }
    if (toDelete?.length) {
      payload.toDelete = toDelete;
    }
    const response = await api.post("/api/sync", payload);

    if (response.status === 200) {
      await AsyncStorage.setItem("lastSync", new Date().toISOString());
    }
  } catch (error) {
    console.error("Error saving data:", error);
  }
}
