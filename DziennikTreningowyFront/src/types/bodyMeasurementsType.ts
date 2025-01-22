import { BodyPartEnum } from "./bodyPartEnum";

export type BodyMeasurements = {
  id?: string;
  date?: Date;
  bodyPart: BodyPartEnum;
  value: number;
};

