import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenProps } from "../../types/navigationStackParms";
import { useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
type Props = {
  isLogin: boolean;
  onSubmit: (
    email: string,
    password: string,
    confirmPassword: string,
    dateOfBirth?: Date
  ) => void;
};
export default function AuthForm({ isLogin, onSubmit }: Props) {
  const navigation = useNavigation<LoginScreenProps>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

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
    onSubmit(email, password, confirmPassword, dateOfBirth);
  };
  const handleDatePicked = async (date: Date) => {
    setDateOfBirth(date);
    setIsDatePickerVisible(false);
  };

  return (
    <View className="px-4 pt-8 bg-white rounded-t-3xl h-5/6 ">
      <View className={inputStyle}>
        <FontAwesome6 name="envelope" size={20} color="grey" />
        <TextInput
          placeholder="Email"
          autoCorrect
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholderTextColor={"black"}
          className="flex-1 h-10 mx-1 text-xl "
          onChangeText={(newValue) =>
            updateInputValueHandler("email", newValue)
          }
        ></TextInput>
      </View>

      <View className={inputStyle}>
        <FontAwesome6 name="lock" size={20} color="grey" />
        <TextInput
          placeholderTextColor="black"
          placeholder="Password "
          secureTextEntry={!passwordVisibility}
          autoCapitalize="none"
          keyboardType="default"
          textContentType={isLogin ? "password" : "newPassword"}
          className="flex-1 h-10 mx-1 text-xl"
          onChangeText={(newValue) =>
            updateInputValueHandler("password", newValue)
          }
          value={password}
        />
        <Pressable
          className="p-1"
          onPress={() => handleChangeVisibilityPassword("password")}
        >
          <FontAwesome6 name="eye-slash" size={20} color="grey" />
        </Pressable>
      </View>

      {!isLogin && (
        <>
          <View className={inputStyle}>
            <FontAwesome6 name="lock" size={20} color="grey" />
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="black"
              textContentType="newPassword"
              keyboardType="visible-password"
              onChangeText={(newValue) =>
                updateInputValueHandler("confirmPassword", newValue)
              }
              value={confirmPassword}
              secureTextEntry={!confirmPasswordVisibility}
              className="flex-1 h-10 mx-1 text-black text-xl "
            ></TextInput>
            <Pressable
              className="p-1"
              onPress={() => handleChangeVisibilityPassword("confirmPassword")}
            >
              <FontAwesome6 name="eye-slash" size={20} color="grey" />
            </Pressable>
          </View>
          <View className={inputStyle}>
            <FontAwesome6 name="calendar-days" size={20} color="grey" />
            <Pressable
              className="justify-center flex-1 h-10 mx-1 "
              onPress={() => setIsDatePickerVisible(true)}
            >
              <Text className=" text-black text-xl">
                {dateOfBirth
                  ? dateOfBirth.toLocaleDateString("us-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "Date of Birth"}
              </Text>
             
              <DateTimePicker // Error with DefaultProps 
                themeVariant="light" // Problem with Calendar Display in Dark Mode (something with react navigation)
                isVisible={isDatePickerVisible}
                mode="date"
                isDarkModeEnabled={false}
                onConfirm={handleDatePicked}
                onCancel={() => setIsDatePickerVisible(false)}
                maximumDate={new Date()}
              />
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
        <Text>
          {isLogin ? `Don't have an account? ` : `Already have an account? `}
        </Text>
        <Pressable onPress={handleChangeScreen}>
          <Text className="font-bold text-green-600">
            {isLogin ? "Sign up" : "Sign in"}{" "}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
const inputStyle =
  "text-black my-2 px-4 items-center flex-row rounded-full  border-gray-500 border ";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    width: "100%",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
});
