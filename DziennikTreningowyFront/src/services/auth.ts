import axios from "axios";

const API_URL = "http://172.20.10.4:8000";
export async function CreateUser(
  email: string,
  password: string,
  dateOfBirth: Date
) {
  const response = await axios.post(API_URL + "/api/auth/register", {
    email: email,
    password: password,
    dateOfBirth: dateOfBirth,
  });
  return response
}
export async function Login(email: string, password: string) {
  const response = await axios.post(API_URL + "/api/auth/login", {
    email: email,
    password: password,
  });
  return response
}
