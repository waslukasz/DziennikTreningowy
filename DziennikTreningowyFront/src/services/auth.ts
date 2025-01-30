import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../axios/axios";

export async function CreateUser(
  email: string,
  password: string,
  userProfile: User | null
) {
  const response = await api.post("/api/auth/register", {
    email: email,
    password: password,
    profile: userProfile,
  });
  return response;
}
export async function Login(email: string, password: string) {
  const response = await api.post("/api/auth/login", {
    email: email,
    password: password,
  })
  return response;
}

export async function UpdateAccount(password: string, newPassword?: string,newEmail?:string) {
  const response = await api
    .put("/api/auth/update", {
      newEmail:newEmail?newEmail:null,
      newPassword: newPassword ? newPassword : null,
      currentPassword: password,
    })
    .catch(function (error) {
      return error.response.status;
    });
  return response;
}
export async function DeleteAccount() {
  const response = await api.delete("/api/auth/delete").catch(function (error) {
    return error.response.status;
  });
  return response;
}
