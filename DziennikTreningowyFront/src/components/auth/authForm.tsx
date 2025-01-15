import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenProps } from "../../types/navigationStackParms";
import { useState } from "react";
import React from "react";
import { useColorScheme } from "nativewind";
type Props = {
  isLogin: boolean;
  onSubmit: (email: string, password: string, confirmPassword: string) => void;
};
export default function AuthForm({ isLogin, onSubmit }: Props) {
  const navigation = useNavigation<LoginScreenProps>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme == "dark" ? "white" : "gray";
  const placeholderColor = colorScheme == "dark" ? "white" : "black";
  const handleChangeScreen = () => {
    if (isLogin) {
      navigation.replace("mainApp", { screen: "SignUp" });
    } else {
      navigation.replace("mainApp", { screen: "Login" });
    }
  };
  const updateInputValueHandler = (
    inputType: "email" | "password" | "confirmPassword",
    enteredValue: string
  ) => {
    switch (inputType) {
      case "email":
        setEmail(enteredValue);
        break;
      case "password":
        setPassword(enteredValue);
        break;
      case "confirmPassword":
        setConfirmPassword(enteredValue);
        break;
    }
  };
  const handleChangeVisibilityPassword = (
    inputType: "password" | "confirmPassword"
  ) => {
    switch (inputType) {
      case "password":
        setPasswordVisibility(!passwordVisibility);
        break;
      case "confirmPassword":
        setConfirmPasswordVisibility(!confirmPasswordVisibility);
        break;
    }
  };
  const submitHandler = () => {
    onSubmit(email, password, confirmPassword);
  };

  return (
    <View className="px-4 pt-8 bg-white rounded-t-3xl h-5/6 dark:bg-zinc-400 ">
      <View className={inputStyle}>
        <FontAwesome6 name="envelope" size={20} color={iconColor} />
        <TextInput
          placeholder="Email"
          autoCorrect
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholderTextColor={placeholderColor}
          className="flex-1 h-full mx-1 text-xl dark:text-white"
          onChangeText={(newValue) =>
            updateInputValueHandler("email", newValue)
          }
        ></TextInput>
      </View>

      <View className={inputStyle}>
        <FontAwesome6 name="lock" size={20} color={iconColor} />
        <TextInput
          placeholderTextColor={placeholderColor}
          placeholder="Password "
          secureTextEntry={!passwordVisibility}
          autoCapitalize="none"
          keyboardType="default"
          textContentType={isLogin ? "password" : "newPassword"}
          className="flex-1 h-full mx-1 text-xl dark:text-white"
          onChangeText={(newValue) =>
            updateInputValueHandler("password", newValue)
          }
          value={password}
        />
        <Pressable
          className="p-1"
          onPress={() => handleChangeVisibilityPassword("password")}
        >
          <FontAwesome6 name="eye-slash" size={20} color={iconColor} />
        </Pressable>
      </View>

      {!isLogin && (
        <>
          <View className={inputStyle}>
            <FontAwesome6 name="lock" size={20} color={iconColor} />
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor={placeholderColor}
              onChangeText={(newValue) =>
                updateInputValueHandler("confirmPassword", newValue)
              }
              value={confirmPassword}
              secureTextEntry={!confirmPasswordVisibility}
              className="flex-1 mx-1 h-full text-black text-xl dark:text-white "
            ></TextInput>
            <Pressable
              className="p-1"
              onPress={() => handleChangeVisibilityPassword("confirmPassword")}
            >
              <FontAwesome6 name="eye-slash" size={20} color={iconColor} />
            </Pressable>
          </View>
        </>
      )}
      <View className="items-center">
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.3 : 1,
            },
            styles.button,
          ]}
          onPress={submitHandler}
        >
          <Text className="text-center text-white font-semibold text-2xl">
            {isLogin ? "Log in" : "Sign Up"}
          </Text>
        </Pressable>
      </View>
      <View className="border-b my-5">{/* line */}</View>
      <View className=" flex-row justify-center">
        <Text className="dark:text-white">
          {isLogin ? `Don't have an account? ` : `Already have an account? `}
        </Text>
        <Pressable onPress={handleChangeScreen}>
          <Text className="font-bold text-green-600 dark:text-green-300">
            {isLogin ? "Sign up" : "Sign in"}{" "}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
const inputStyle =
  "text-black my-1 px-4 h-12 items-center flex-row rounded-full border-gray-500 border bg-white dark:bg-zinc-400 dark:border-white";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    width: "100%",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
});
