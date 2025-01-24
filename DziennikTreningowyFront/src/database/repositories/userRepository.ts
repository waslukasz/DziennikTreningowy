import { db } from "../databaseSettings";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { dataToSync } from "./syncRepository";

export async function createUser(user: User,isAuthenticate:boolean) {
  try {
    const guidId=uuidv4();
    const { firstName, height, weight } = user;
    const result = await db.runAsync(
      `
        INSERT INTO User (id,firstName, height, weight)
        VALUES (?, ?, ?, ?)
        `,
      [guidId,firstName, height, weight]
    );
    if (result.changes && result.changes > 0) {
      if (isAuthenticate) {
        dataToSync();
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("create user issue", error);
    return false;
  }
}
export async function getUser() {
  const result = await db.getFirstAsync<User>("SELECT * FROM User");
  return result;
}
export async function updateUser(user: User,isAuthenticate:boolean) {
  try {
    const { id, firstName, height, weight } = user;
    const result = await db.runAsync(
      `
          UPDATE User
          SET firstName = ?, height = ?, weight = ?
          WHERE id = ?
        `,
      [firstName || null, height || null, weight || null, id!]
    );
    if (result.changes && result.changes > 0) {
      if (isAuthenticate) {
        dataToSync();
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("update user issue", error);
    return false;
  }
}
export async function deleteUser(isAuthenticate:boolean,userId?:string) {
  try {
    if (userId) {
      const result = await db.runAsync(
        `
        DELETE FROM User
        WHERE id = ?
        `,
        [userId]
      );
      if (result.changes && result.changes > 0) {
        if (isAuthenticate) {
         // dataToSync();zmeinic 
        }
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log("delete user issue", error);
    return false;
  }
}
