import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import AuthForm from "./authForm";
type Props={
    isLogin:boolean,
}
export default function AuthContent({isLogin}:Props) {
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
        password: false,
        confirmEmail: false,
        confirmPassword: false,
      });
      const submitHandler=()=>{
      }
  return (
    <View className="" >
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View >
        {/* <Pressable onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </Pressable> */}
      </View>
    </View>
  );
}
