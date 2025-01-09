import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { createUser } from "../database/repositories/userRepository";

const FirstLaunchScreen = ({ navigation }: { navigation: any }) => {
  const inputStyle =
    "text-black px-4 h-12 bg-gray-50 my-2 w-72 rounded-xl text-center";
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [name, setName] = useState("");

  async function handleButton() {
    if (height && weight && name) {
      await AsyncStorage.setItem("hasSeenLaunchScreen", "true");
      let user: User = {
        firstName: name,
        height: parseFloat(height),
        weight: parseFloat(weight),
      };
      const response = await createUser(user);
      if (response) {
        navigation.replace("mainApp", { screen: "Home" });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to save data",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Enter correct data!",
      });
    }
  }

  return (
    <LinearGradient
      colors={["#11998E", "#38EF7D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View className="h-full">
        <View className="py-32 px-10 items-center">
          <Text className="text-center text-2xl font-bold text-white mb-10">
            Tell us something about yourself
          </Text>
          <TextInput
            className={inputStyle}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            keyboardType="default"
            placeholderTextColor="gray"
            placeholder="Your name"
          />
          <TextInput
            className={inputStyle}
            value={height}
            onChangeText={(text) => {
              if (!isNaN(+text)) {
                setHeight(text);
              }
            }}
            placeholderTextColor="gray"
            placeholder="Height in centimeters"
            keyboardType="number-pad"
          />
          <TextInput
            className={inputStyle}
            value={weight}
            onChangeText={(text) => {
              if (!isNaN(+text)) {
                setWeight(text);
              }
            }}
            placeholderTextColor="gray"
            placeholder="Weight in kilograms"
            keyboardType="number-pad"
          />
          <View className="border-white border w-40 h-10 rounded-xl justify-center mt-5">
            <Text
              className="text-center text-white font-bold text-lg"
              onPress={handleButton}
            >
              Let's start!
            </Text>
          </View>
        </View>
        <View className="bottom-5 absolute w-full">
          <Text
            className="text-center text-2xl font-bold text-white mb-10"
            onPress={() => {
              AsyncStorage.setItem("hasSeenLaunchScreen", "true");
              navigation.replace("mainApp", { screen: "Home" });
            }}
          >
            Skip
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default FirstLaunchScreen;
