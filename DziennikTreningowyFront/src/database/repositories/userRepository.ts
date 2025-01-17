import { db } from "../databaseSettings";

export async function createUser(user: User) {
  try {
    const { firstName, height, weight } = user;
    const result = await db.runAsync(
      `
        INSERT INTO User (firstName, height, weight)
        VALUES (?, ?, ?)
        `,
      [firstName, height, weight]
    );
    if (result.changes && result.changes > 0) {
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
export async function updateUser(user: User) {
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
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("update user issue", error);
    return false;
  }
}
export async function deleteUser() {
  try {
    const user = await getUser();
    const userId = user?.id;
    if (userId) {
      const result = await db.runAsync(
        `
        DELETE FROM User
        WHERE id = ?
        `,
        [userId]
      );
      if (result.changes && result.changes > 0) {
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
