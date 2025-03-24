import { BodyMeasurements } from "./bodyMeasurementsType";

export type SyncData = {
    trainings: Training[];
    exercises: Exercise[];
    measurements: BodyMeasurements[];
    profile: User;
  };