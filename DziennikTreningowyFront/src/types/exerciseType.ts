type Exercise = {
  id?: string;
  name: string;
  description?:string;
  weight?:number;
  repetitions?:number;
  sets?:number;
  duration?:string;
  trainingId:string;
  timestamp?: Date;
  isDone:boolean;
};
