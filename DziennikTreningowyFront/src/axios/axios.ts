import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContextValue } from "../components/auth/authContext";
//const API_URL = "http://172.20.10.4:8000";
const API_URL = "http://192.168.1.55:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (request) => {
    const accessToken = await AsyncStorage.getItem("token");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function setupAxiosInterceptors(authContext: AuthContextValue) {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        try {
          const response = await NewTokenWithRefreshToken();
          if(!response){
            return
          }
          const { accessToken, refreshToken } = response?.data;
          await AsyncStorage.setItem("token", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);
          error.config.headers["Authorization"] = `Bearer ${accessToken}`;
          return api.request(error.config);
        } catch (refreshError) {
          console.error("Błąd odświeżania tokena:", refreshError);
          if (authContext.logout) {
            authContext.logout();
          }
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
}
export async function NewTokenWithRefreshToken() {
  const refreshToken=await AsyncStorage.getItem("refreshToken");
  if(refreshToken){
    const response=await api.post("/api/auth/refresh",
     refreshToken
    )
    return response;
  }
  return 
  
}

export default api;
