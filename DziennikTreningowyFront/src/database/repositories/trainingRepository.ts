import {  db } from "../databaseSettings";

export async function getAllTraingins() {
    const result = await db.getAllAsync<Training>('SELECT * FROM Trainings');
    return result;
}
export async function getTrainingById(id:number) {
    const result = await db.getFirstAsync<Training>('SELECT * FROM Trainings WHERE id = $value',{ $value: id});
    return result
}
export async function getTrainingsByDate(timestamp:Date){
    const dateToString=timestamp.toISOString()
    const result = await db.getAllAsync<Training>('SELECT * FROM Trainings where timestamp=$value',{$value:dateToString});
    return result;
}
export async function getTraingsInDateRange(from:Date,to:Date) {
    const fromDate = from.toISOString().split('T')[0];
  const toDate = to.toISOString().split('T')[0];
  const result = await db.getAllAsync<Training>('SELECT * FROM Trainings WHERE DATE(timestamp) BETWEEN ? AND ?', [fromDate, toDate]);
  return result;
}
export async function createTraining(date:Date){
    const dateToString=date.toISOString()
    const result = await db.runAsync(`INSERT INTO Trainings (timestamp) VALUES ('${dateToString}')`);
}
export async function deleteTraining(id:number ){
    const result=await db.runAsync('DELETE FROM Trainings WHERE id = $value', { $value: id });
}
export async function updateTraining(training:Training){
    const dateToString=training.timestamp.toISOString()
    const result = await db.runAsync('UPDATE Trainings SET timestamp = ? WHERE id = ?', [dateToString, training.id]);
    return result;
}