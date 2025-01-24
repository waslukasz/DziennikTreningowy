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
  return response.data;
}
export async function Login(email: string, password: string) {
  const response = await api.post("/api/auth/login", {
    email: email,
    password: password,
  });
  return response.data;
}

export async function NewPassword(oldPassword: string, newPassword: string) {
  const response = await api.put(
    "/api/auth/update",
    {
      newPassword: newPassword,
      currentPassword: oldPassword,
    },
  ).catch(function (error) {
    return error.response.status;
  });
  return response;
}
