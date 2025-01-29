import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../databaseSettings";
import { BodyMeasurements } from "../../types/bodyMeasurementsType";

export async function dataToSync() {
  try {
    const trainings = await getTrainingsToSync();
    const exercises = await getExercisesToSync();
    const measurements = await getMeasurementsToSync();
    const profile = await getProfileToSync();
    const toDelete = await getToDeleteToSync();
    return { trainings, exercises, measurements, profile ,toDelete};
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
async function getToDeleteToSync() {
  const result = await db.getAllAsync<ToDelete>("SELECT * FROM ToDelete");
  return result;
}
export async function saveSyncedData(
  trainings?: Training[],
  exercises?: Exercise[],
  measurements?: BodyMeasurements[],
  profile?: User | null
) {
  await db.withTransactionAsync(async () => {
    try {
      // Trainigs
      if (trainings && trainings.length > 0) {
        for (const training of trainings) {
          const existingTraining = await db.getFirstAsync<Training>(
            "SELECT * FROM Trainings WHERE id = ?",
            [training.id]
          );
          const timestamp =
            training.timestamp instanceof Date
              ? training.timestamp
              : new Date(training.timestamp);

          const updatedAt =
            training.updatedAt instanceof Date
              ? training.updatedAt
              : training.updatedAt
              ? new Date(training.updatedAt)
              : new Date();

          if (existingTraining) {
            await db.runAsync(
              `UPDATE Trainings SET timestamp = ?, updatedAt = ? WHERE id = ?`,
              [timestamp.toISOString(), updatedAt.toISOString(), training.id]
            );
            console.log(`Training ${training.id} updated.`);
          } else {
            await db.runAsync(
              `INSERT INTO Trainings (id, timestamp, updatedAt) VALUES (?, ?, ?)`,
              [training.id, timestamp.toISOString(), updatedAt.toISOString()]
            );
          }
        }
      }

      // Exercises
      if (exercises && exercises.length > 0) {
        for (const exercise of exercises) {
          const existingExercise = await db.getFirstAsync<Exercise>(
            "SELECT * FROM Exercises WHERE id = ?",
            [exercise.id!]
          );

          const updatedAt =
            exercise.updatedAt instanceof Date
              ? exercise.updatedAt
              : exercise.updatedAt
              ? new Date(exercise.updatedAt)
              : new Date();

          if (existingExercise) {
            await db.runAsync(
              `UPDATE Exercises 
               SET name = ?, weight = ?, repetitions = ?, sets = ?, trainingId = ?, updatedAt = ?, isDone = ?
               WHERE id = ?`,
              [
                exercise.name,
                exercise.weight || null,
                exercise.repetitions || null,
                exercise.sets || null,
                exercise.trainingId,
                updatedAt.toISOString(),
                exercise.isDone ? 1 : 0,
                exercise.id!,
              ]
            );
          } else {
            await db.runAsync(
              `INSERT INTO Exercises (id, name, weight, repetitions, sets, trainingId, isDone , updatedAt) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                exercise.id!,
                exercise.name,
                exercise.weight || null,
                exercise.repetitions || null,
                exercise.sets || null,
                exercise.trainingId,
                exercise.isDone ? 1 : 0,
                updatedAt.toISOString(),
              ]
            );
          }
        }
      }

      // Measurements
      if (measurements && measurements.length > 0) {
        for (const measurement of measurements) {
          const existingMeasurement = await db.getFirstAsync<BodyMeasurements>(
            "SELECT * FROM BodyMeasurements WHERE id = ?",
            [measurement.id!]
          );

          const updatedAt =
            measurement.updatedAt instanceof Date
              ? measurement.updatedAt
              : measurement.updatedAt
              ? new Date(measurement.updatedAt)
              : new Date();

          if (existingMeasurement) {
            await db.runAsync(
              `UPDATE BodyMeasurements 
               SET date = ?, bodyPart = ?, updatedAt = ?, value = ?
               WHERE id = ?`,
              [
                measurement.date
                  ? new Date(measurement.date).toISOString()
                  : new Date().toISOString(),
                measurement.bodyPart,
                updatedAt.toISOString(),
                measurement.value,
                measurement.id!,
              ]
            );
          } else {
            await db.runAsync(
              `INSERT INTO BodyMeasurements (id, date, bodyPart, value, updatedAt) 
               VALUES (?, ?, ?, ?, ?)`,
              [
                measurement.id!,
                measurement.date
                  ? new Date(measurement.date).toISOString()
                  : new Date().toISOString(),
                measurement.bodyPart,
                measurement.value,
                updatedAt.toISOString(),
              ]
            );
          }
        }
      }

      // Profile
      if (profile) {
        const existingProfile = await db.getFirstAsync<User>(
          "SELECT * FROM User WHERE id = ?",
          [profile.id!]
        );

        const updatedAt =
          profile.updatedAt instanceof Date
            ? profile.updatedAt
            : profile.updatedAt
            ? new Date(profile.updatedAt)
            : new Date();

        if (existingProfile) {
          await db.runAsync(
            `UPDATE User
             SET firstName = ?, height = ?, weight = ?, updatedAt = ?
             WHERE id = ?`,
            [
              profile.firstName || null,
              profile.height || null,
              profile.weight || null,
              updatedAt.toISOString(),
              profile.id!,
            ]
          );
          console.log(`Profile ${profile.id} updated.`);
        } else {
          await db.runAsync(
            `INSERT INTO User (id, firstName, height, weight, updatedAt) 
             VALUES (?, ?, ?, ?, ?)`,
            [
              profile.id!,
              profile.firstName,
              profile.height,
              profile.weight,
              updatedAt.toISOString(),
            ]
          );
        }
      }

      console.log("All data saved successfully in transaction!");
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  });
}
