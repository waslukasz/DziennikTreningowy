import { useContext, useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../components/auth/authContext";
import { getUser, updateUser } from "../database/repositories/userRepository";
import { useColorScheme } from "nativewind";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Toast from "react-native-toast-message";
import { NewPassword } from "../services/auth";

export default function ProfileScreen({ navigation }: any) {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState<User>();
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { colorScheme } = useColorScheme();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [firstName, setFirstName] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  const placeholderColor = colorScheme == "dark" ? "white" : "black";
  const iconColor = colorScheme == "dark" ? "white" : "gray";

  const setUserDataToInput = () => {
    if (user) {
      setFirstName(user.firstName);
      setWeight(user.weight.toString());
      setHeight(user.height.toString());
    }
  };

  const getUserFromDatabase = async () => {
    const getuser = await getUser();
    if (getuser) {
      await setUser(getuser);
      setUserDataToInput();
    }
  };
  const resetPasswordInputs = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  useEffect(() => {
    getUserFromDatabase();
  }, []);
  const userProfileUpdate = async () => {
    if (height && weight && firstName) {
      const newUser: User = {
        id: user?.id,
        firstName: firstName,
        height: parseFloat(height),
        weight: parseFloat(weight),
      };
      updateUser(newUser);
      getUserFromDatabase();
      setShowUserProfile(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Successfully saved!",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Enter correct data!",
      });
    }
  };
  const changePassword = async () => {
    const oldPasswordIsEmpty = oldPassword.length > 0;
    const passwordIsValid = newPassword.length > 6;
    const passwordsAreEqual = newPassword === confirmPassword;
    if (!passwordIsValid || !passwordsAreEqual || !oldPasswordIsEmpty) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid inputs!",
      });
      return;
    }
    const result = await NewPassword(oldPassword, newPassword);
    if (result == 400) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please check your input and try again.",
      });
      return;
    }
  };
  return (
    <View className="flex-1 bg-zinc-100 dark:bg-zinc-500 p-1">
      {!auth.isAuthenticated && (
        <Pressable
          className="mb-1 w-full h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className=" text-center text-lg dark:text-white">Login</Text>
        </Pressable>
      )}
      <TouchableOpacity
        onPress={() => {
          setShowUserProfile(!showUserProfile);
          setUserDataToInput();
        }}
        className="mb-1 w-full h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
      >
        <Text className="text-center text-lg dark:text-white ">
          User profile
        </Text>
      </TouchableOpacity>

      {showUserProfile && (
        <View>
          <TextInput
            className={inputStyle}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholderTextColor={placeholderColor}
            placeholder="First Name"
          ></TextInput>
          <TextInput
            className={inputStyle}
            value={height}
            keyboardType="number-pad"
            onChangeText={(text) => setHeight(text)}
            placeholderTextColor={placeholderColor}
            placeholder="Height in centimeters"
          ></TextInput>
          <TextInput
            className={inputStyle}
            value={weight}
            keyboardType="number-pad"
            onChangeText={(text) => setWeight(text)}
            placeholderTextColor={placeholderColor}
            placeholder="Weight in kilograms"
          ></TextInput>
          <View className=" flex flex-row justify-center my-2">
            <TouchableOpacity
              onPress={() => {
                setShowUserProfile(false);
                setUserDataToInput();
              }}
              className=" h-12 justify-center items-center w-2/5 mx-1 bg-red-400  rounded-xl "
            >
              <Text className="dark:text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                userProfileUpdate();
              }}
              className=" h-12 justify-center items-center w-2/5 mx-1 bg-green-400  rounded-xl "
            >
              <Text className="dark:text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {auth.isAuthenticated && (
        <TouchableOpacity
          onPress={() => {
            setShowNewPassword(!showNewPassword);
            resetPasswordInputs();
          }}
          className="mb-1 w-full h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
        >
          <Text className="text-center text-lg dark:text-white ">
            Set new password
          </Text>
        </TouchableOpacity>
      )}
      {showNewPassword && (
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
              textContentType="oneTimeCode"
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
              textContentType="oneTimeCode"
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
                setShowNewPassword(false);
                resetPasswordInputs();
              }}
              className=" h-12 justify-center items-center w-2/5 mx-1 bg-red-400  rounded-xl "
            >
              <Text className="dark:text-white">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={changePassword}
              className=" h-12 justify-center items-center w-2/5 mx-1 bg-green-400  rounded-xl "
            >
              <Text className="dark:text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {auth.isAuthenticated && (
        <TouchableOpacity
          onPress={auth.logout}
          className="w-full h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
        >
          <Text className="text-center text-lg text-red-500 text-bold">
            Log out
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const inputStyle =
  "text-black my-1 px-4 h-12 items-center  dark:text-white flex-row rounded-xl border-gray-500 border-2 bg-white dark:bg-zinc-400 dark:border-white";
