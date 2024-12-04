import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AuthForm from "./authForm";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
type Props = {
  isLogin: boolean;
  onAuthenticate: (
    email: string,
    password: string,
  ) => void;
};
export default function AuthContent({ isLogin,onAuthenticate }: Props) {
  const submitHandler = (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;
    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid inputs!",
      });
      return;
    }
    onAuthenticate(email, password);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient className="flex-1" colors={["#1C3113", "#40933A"]}>
        <View className="flex-1 justify-end">
          <AuthForm isLogin={isLogin} onSubmit={submitHandler} />
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
