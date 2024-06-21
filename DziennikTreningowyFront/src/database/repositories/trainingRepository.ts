import { SQLiteDatabase } from "expo-sqlite";

export async function getAllTraingins(db:SQLiteDatabase) {
    const result = await db.getAllAsync<Training>('SELECT * FROM Trainings');
    return result;
}
export async function getTrainingById(db:SQLiteDatabase,id:number) {
    const result = await db.getFirstAsync<Training>('SELECT * FROM Trainings WHERE id = $value',{ $value: id});
    return result
}
export async function getTrainingsByDate(db:SQLiteDatabase,timestamp:Date){
    const dateToString=timestamp.toISOString().split('T')[0]
    const result = await db.getAllAsync<Training>('SELECT * FROM Trainings where timestamp=$value',{$value:dateToString});
    return result;
}
export async function createTraining(db:SQLiteDatabase,date:Date){
    const dateToString=date.toISOString().split('T')[0]
    const result = await db.runAsync(`INSERT INTO Trainings (timestamp) VALUES ('${dateToString}')`);
}
export async function deleteTraining(db:SQLiteDatabase,id:number ){
    const result=await db.runAsync('DELETE FROM Trainings WHERE id = $value', { $value: id });
}
export async function updateTraining(db:SQLiteDatabase,training:Training){
    const dateToString=training.timestamp.toISOString().split('T')[0]
    const result = await db.runAsync('UPDATE Trainings SET timestamp = ? WHERE id = ?', [dateToString, training.id]);
    return result;
}