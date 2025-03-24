import { db } from "../databaseSettings";
import "react-native-get-random-values";
export async function createToDelete(id: string, type: "training" | "exercise" | "measurement") {
    try {
      await db.runAsync(
        `INSERT INTO ToDelete (id, type) VALUES (?, ?)`,
        [id, type]
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
export async function clearToDelete() {
    try{
        await db.runAsync("DELETE FROM ToDelete");
        return true
    }catch(error){
        console.log(error)
        return false
    }
}