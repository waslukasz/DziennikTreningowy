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
  handleSetNewEmail: (
    newEmail: string,
    confirmEmail: string,
    password: string
  ) => void;
  setShowNewEmail: () => void;
};

export default function NewEmailInput({
  handleSetNewEmail,
  setShowNewEmail,
}: Props) {
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { colorScheme } = useColorScheme();

  const resetEmailInputs = () => {
    setNewEmail("");
    setConfirmEmail("");
    setPassword("");
  };

  const placeholderColor = colorScheme === "dark" ? "white" : "black";
  const iconColor = colorScheme === "dark" ? "white" : "gray";

  return (
    <View>
      <View className={inputStyle}>
        <TextInput
          className="flex-1 text-black dark:text-white"
          value={newEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(text) => setNewEmail(text)}
          placeholderTextColor={placeholderColor}
          placeholder="New email"
        />
      </View>
      <View className={inputStyle}>
        <TextInput
          className="flex-1 text-black dark:text-white"
          value={confirmEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          onChangeText={(text) => setConfirmEmail(text)}
          placeholderTextColor={placeholderColor}
          placeholder="Confirm new email"
        />
      </View>
      <View className={inputStyle}>
        <TextInput
          className="flex-1 text-black dark:text-white"
          secureTextEntry={!passwordVisibility}
          value={password}
          autoCapitalize="none"
          keyboardType="default"
          textContentType="password"
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={placeholderColor}
          placeholder="Password"
        />
        <Pressable
          className="p-1"
          onPress={() => setPasswordVisibility(!passwordVisibility)}
        >
          <FontAwesome6 name="eye-slash" size={20} color={iconColor} />
        </Pressable>
      </View>
      <View className="flex flex-row justify-center my-2">
        <TouchableOpacity
          onPress={() => {
            setShowNewEmail();
            resetEmailInputs();
          }}
          className="h-12 justify-center items-center w-2/5 mx-1 bg-red-400 rounded-xl"
        >
          <Text className="dark:text-white">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSetNewEmail(newEmail, confirmEmail, password)}
          className="h-12 justify-center items-center w-2/5 mx-1 bg-green-400 rounded-xl"
        >
          <Text className="dark:text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const inputStyle =
  "text-black my-1 px-4 h-12 items-center dark:text-white flex-row rounded-xl border-gray-500 border-2 bg-white dark:bg-zinc-400 dark:border-white";
