import { useContext, useState } from "react";
import AuthContent from "../components/auth/authContent";
import { Login } from "../services/auth";
import LoadingOverlay from "../components/auth/loadingOverlay";
import Toast from "react-native-toast-message";
import { AuthContext } from "../components/auth/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { synchronize } from "../services/sync";

export default function LoginScreen({ navigation }: any) {
  //wyjebac any
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const loginHandler = async (email: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const response = await Login(email, password);
      const token = response.accessToken;
      const  refreshToken=response.refreshToken;
      authCtx.authenticate(token,refreshToken);
      const lastSync=await AsyncStorage.getItem("lastSync")
      synchronize(lastSync)
      navigation.replace("mainApp", { screen: "Home" });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Incorrect email or password!",
      });
    }
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in"></LoadingOverlay>;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler}></AuthContent>;
}