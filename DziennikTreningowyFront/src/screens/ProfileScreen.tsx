import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../components/auth/authContext";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../database/repositories/userRepository";
import { useColorScheme } from "nativewind";
import Toast from "react-native-toast-message";
import { DeleteAccount, UpdateAccount } from "../services/auth";
import { deleteAllData } from "../database/databaseSettings";
import NewPasswordInput from "../components/profile/newPasswordInput";
import NewEmailInput from "../components/profile/newEmailInput";

export default function ProfileScreen({ navigation }: any) {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState<User>();
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewEmail, setShowNewEmail] = useState(false);
  const { colorScheme } = useColorScheme();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [firstName, setFirstName] = useState("");

  const placeholderColor = colorScheme == "dark" ? "white" : "black";
  const iconColor = colorScheme == "dark" ? "white" : "gray";

  const setUserDataToInput = () => {
    if (user) {
      setFirstName(user.firstName);
      setWeight(user.weight ? user.weight.toString() : "");
      setHeight(user.height ? user.height.toString() : "");
    } else {
      setFirstName("");
      setWeight("");
      setHeight("");
    }
  };

  const getUserFromDatabase = async () => {
    const getuser = await getUser();
    if (getuser) {
      await setUser(getuser);
      setUserDataToInput();
    } else {
      await setUser(undefined);
    }
  };
  const closeAllItems = () => {
    setShowNewEmail(false);
    setShowNewPassword(false);
    setShowUserProfile(false);
  };

  useEffect(() => {
    getUserFromDatabase();
  }, []);
  const userProfileUpdate = async () => {
    if (height && weight && firstName) {
      const newUser: User = {
        id: user ? user?.id : undefined,
        firstName: firstName,
        height: parseFloat(height),
        weight: parseFloat(weight),
      };
      if (user) {
        updateUser(newUser, auth.isAuthenticated);
      } else {
        createUser(newUser, auth.isAuthenticated);
      }
      getUserFromDatabase();
      closeAllItems();
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
  const changeEmail = async (
    newEmail: string,
    confirmEmail: string,
    password: string
  ) => {
    const emailIsValid = newEmail.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = newEmail === confirmEmail;
    if (!passwordIsValid || !emailsAreEqual || !emailIsValid) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid inputs!",
      });
      return;
    }
    const result = await UpdateAccount(password, undefined, newEmail);
    if (result == 400) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please check your input and try again.",
      });
      return;
    }
    closeAllItems();
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Successfully saved!",
    });
  };

  const changePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
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
    const result = await UpdateAccount(oldPassword, newPassword);
    if (result == 400) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please check your input and try again.",
      });
      return;
    }
    closeAllItems();
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Successfully saved!",
    });
  };
  const handleDeleteAccount = async () => {
    const result = await DeleteAccount();
    if (result.status == 200) {
      auth.logout();
      closeAllItems();
      return;
    }
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Try again later!",
    });
  };
  const handleDeleteAllData = async () => {
    deleteAllData();
    closeAllItems();
    auth.logout();
    getUserFromDatabase();
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Successfully deleted!",
    });
  };
  return (
    <ScrollView className="flex-1 bg-zinc-100 dark:bg-zinc-500 p-1">
      {!auth.isAuthenticated && (
        <Pressable
          className="mb-1 w-full h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className=" text-center text-lg dark:text-white">Login</Text>
        </Pressable>
      )}
      {auth.isAuthenticated && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Ranking");
          }}
          className="mb-1 w-full h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
        >
          <Text className="text-center text-lg dark:text-white ">Ranking</Text>
        </TouchableOpacity>
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
            setShowNewEmail(!showNewEmail);
            // resetEmailInputs();
          }}
          className="mb-1 w-full h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
        >
          <Text className="text-center text-lg dark:text-white ">
            Set new email
          </Text>
        </TouchableOpacity>
      )}
      {showNewEmail && (
        <NewEmailInput
          handleSetNewEmail={changeEmail}
          setShowNewEmail={() => setShowNewEmail(false)}
        ></NewEmailInput>
      )}
      {auth.isAuthenticated && (
        <TouchableOpacity
          onPress={() => {
            setShowNewPassword(!showNewPassword);
          }}
          className="mb-1 w-full h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
        >
          <Text className="text-center text-lg dark:text-white ">
            Set new password
          </Text>
        </TouchableOpacity>
      )}
      {showNewPassword && (
        <NewPasswordInput
          handleSetNewPassword={changePassword}
          setShowNewPassword={() => setShowNewPassword(false)}
        ></NewPasswordInput>
      )}
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "",
            "Are you sure you want to delete?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              { text: "Yes", onPress: handleDeleteAllData },
            ],
            { cancelable: false }
          )
        }
        className="w-full mb-1 h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
      >
        <Text className="text-center mb-1 text-lg text-red-500 text-bold">
          Delete all data
        </Text>
      </TouchableOpacity>
      {/* {user && (
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "",
              "Are you sure you want to delete?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                { text: "Yes", onPress: deleteUserProfile },
              ],
              { cancelable: false }
            )
          }
          className="w-full mb-1 h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
        >
          <Text className="text-center mb-1 text-lg text-red-500 text-bold">
            Delete User Profile
          </Text>
        </TouchableOpacity>
      )} */}
      {auth.isAuthenticated && (
        <>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "",
                "Are you sure you want to delete?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  { text: "Yes", onPress: handleDeleteAccount },
                ],
                { cancelable: false }
              )
            }
            className="w-full mb-1 h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
          >
            <Text className="text-center text-lg text-red-500 text-bold">
              Delete Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              auth.logout();
              closeAllItems();
            }}
            className="w-full mb-1 h-16 justify-center bg-white dark:bg-zinc-400 dark:border-white"
          >
            <Text className="text-center text-lg text-red-500 text-bold">
              Log out
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
const inputStyle =
  "text-black my-1 px-4 h-12 items-center  dark:text-white flex-row rounded-xl border-gray-500 border-2 bg-white dark:bg-zinc-400 dark:border-white";
