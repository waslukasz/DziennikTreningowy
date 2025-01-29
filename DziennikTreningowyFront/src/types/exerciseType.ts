type Exercise = {
  id?: string;
  name: string;
  weight?:number;
  repetitions?:number;
  sets?:number;
  trainingId:string;
  timestamp?: Date;
  isDone:boolean;
};
