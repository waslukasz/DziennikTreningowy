import { useState } from "react";
import AuthContent from "../components/auth/authContent";
import { CreateUser } from "../services/auth";
import Toast from "react-native-toast-message";
import LoadingOverlay from "../components/auth/loadingOverlay";
import { getUser } from "../database/repositories/userRepository";

export default function SignUpScreen({ navigation }: any) {// any do wyjebania ale SignupScreenProps cos sie jebie
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const SignUpHandler = async (
    email: string,
    password: string,
  ) => {
    setIsAuthenticating(true);
    try {
          const userProfile=await getUser();
          console.log(userProfile);
          await CreateUser(email, password,userProfile);
          navigation.replace("mainApp", { screen: "Login" });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not create user, check your input and try again",
      });
    }
    setIsAuthenticating(false);
  };
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..."></LoadingOverlay>;
  }
  return (
    <AuthContent isLogin={false} onAuthenticate={SignUpHandler}></AuthContent>
  );
}
