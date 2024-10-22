import { BodyPartEnum } from "./bodyPartEnum";

export type BodyMeasurements = {
  id?: number;
  date?: Date;
  bodyPart: BodyPartEnum;
  value: number;
};

