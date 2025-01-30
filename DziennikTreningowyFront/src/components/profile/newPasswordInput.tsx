import {
  Pressable,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";
import { useColorScheme } from "nativewind";
type Props = {
  handleSetNewPassword: (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => void;
  setShowNewPassword: () => void;
};
export default function NewPasswordInput({ handleSetNewPassword,setShowNewPassword }: Props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  const { colorScheme } = useColorScheme();
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const resetPasswordInputs = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  const placeholderColor = colorScheme == "dark" ? "white" : "black";
  const iconColor = colorScheme == "dark" ? "white" : "gray";

  return (
    <View>
      <View className={inputStyle}>
        <TextInput
          className="flex-1 text-black dark:text-white"
          value={oldPassword}
          secureTextEntry={!oldPasswordVisibility}
          onChangeText={(text) => setOldPassword(text)}
          autoCapitalize="none"
          keyboardType="default"
          placeholderTextColor={placeholderColor}
          placeholder="Old password"
          textContentType="password"
        ></TextInput>
        <Pressable
          className="p-1"
          onPress={() => setOldPasswordVisibility(!oldPasswordVisibility)}
        >
          <FontAwesome6 name="eye-slash" size={20} color={iconColor} />
        </Pressable>
      </View>
      <View className={inputStyle}>
        <TextInput
          className="flex-1 text-black dark:text-white"
          secureTextEntry={!newPasswordVisibility}
          value={newPassword}
          autoCapitalize="none"
          keyboardType="default"
          textContentType="newPassword"
          onChangeText={(text) => setNewPassword(text)}
          placeholderTextColor={placeholderColor}
          placeholder="New password"
        ></TextInput>
        <Pressable
          className="p-1"
          onPress={() => setNewPasswordVisibility(!newPasswordVisibility)}
        >
          <FontAwesome6 name="eye-slash" size={20} color={iconColor} />
        </Pressable>
      </View>
      <View className={inputStyle}>
        <TextInput
          className="flex-1 text-black dark:text-white"
          secureTextEntry={!confirmPasswordVisibility}
          value={confirmPassword}
          autoCapitalize="none"
          keyboardType="default"
          textContentType="oneTimeCode"
          onChangeText={(text) => setConfirmPassword(text)}
          placeholderTextColor={placeholderColor}
          placeholder="Confirm new password"
        ></TextInput>
        <Pressable
          className="p-1"
          onPress={() =>
            setConfirmPasswordVisibility(!confirmPasswordVisibility)
          }
        >
          <FontAwesome6 name="eye-slash" size={20} color={iconColor} />
        </Pressable>
      </View>
      <View className=" flex flex-row justify-center my-2">
        <TouchableOpacity
          onPress={() => {
            setShowNewPassword();
            resetPasswordInputs();
          }}
          className=" h-12 justify-center items-center w-2/5 mx-1 bg-red-400  rounded-xl "
        >
          <Text className="dark:text-white">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSetNewPassword(oldPassword,newPassword,confirmPassword)}
          className=" h-12 justify-center items-center w-2/5 mx-1 bg-green-400  rounded-xl "
        >
          <Text className="dark:text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const inputStyle =
  "text-black my-1 px-4 h-12 items-center  dark:text-white flex-row rounded-xl border-gray-500 border-2 bg-white dark:bg-zinc-400 dark:border-white";
