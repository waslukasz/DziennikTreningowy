import axios from "axios";

//const API_URL = "http://172.20.10.4:8000";
const API_URL = "http://192.168.200.116:8000";
export async function CreateUser(
  email: string,
  password: string,
) {
  const response = await axios.post(API_URL + "/api/auth/register", {
    email: email,
    password: password,
    dateOfBirth: new Date(),// to remove 
  });
  return response.data
}
export async function Login(email: string, password: string) {
  const response = await axios.post(API_URL + "/api/auth/login", {
    email: email,
    password: password,
  });
  return response.data
}
