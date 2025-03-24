import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getUser } from "../../database/repositories/userRepository";
import React from "react";
import CalculatorInput from "../../components/calculator/CalculatorInput";
import { useColorScheme } from "nativewind";

const BmrCalculatorScreen = ({ navigation }: { navigation: any }) => {
  const [bodyWeight, setBodyWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [bmr, setBmr] = useState<number>();
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    navigation.setOptions({
      title: "Basal Metabolic Rate calculator",
    });
    async function getUserData() {
      let user = await getUser();
      if (user) {
        setHeight(user.height.toString());
        setBodyWeight(user.weight.toString());
      }
    }
    getUserData();
  }, []);

  const maleStyle = `${
    gender === "male" ? "bg-blue-200" : "bg-gray-200"
  } w-24 py-2 rounded-l-lg`;
  const femaleStyle = `${
    gender === "female" ? "bg-pink-200" : "bg-gray-200"
  } w-24 py-2 rounded-r-lg`;

  function calculateBmr() {
    if (
      bodyWeight &&
      height &&
      age &&
      parseFloat(height) > 0 &&
      parseFloat(bodyWeight) > 0 &&
      parseFloat(age) > 0
    ) {
      if (gender == "male") {
        let tempBmr =
          10 * parseFloat(bodyWeight) +
          6.25 * parseFloat(height) -
          5 * parseFloat(age) +
          5;
        setBmr(tempBmr);
      } else {
        let tempBmr =
          10 * parseFloat(bodyWeight) +
          6.25 * parseFloat(height) -
          5 * parseFloat(age) -
          161;
        setBmr(tempBmr);
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
    <View className="bg-zinc-100 dark:bg-zinc-500 min-h-screen">
      <View className="p-5 flex items-center">
        <CalculatorInput
          value={bodyWeight}
          setValue={setBodyWeight}
          placeholderText={"Body weight in kilograms"}
        />
        <CalculatorInput
          value={height}
          setValue={setHeight}
          placeholderText={"Height in centimeters"}
        />
        <CalculatorInput
          value={age}
          setValue={setAge}
          placeholderText={"Age"}
        />

        <View className="flex content-center flex-row">
          <Pressable className={maleStyle} onPress={() => setGender("male")}>
            <Text className="text-center text-lg">Male</Text>
          </Pressable>
          <Pressable className={femaleStyle}>
            <Text
              className="text-center text-lg"
              onPress={() => setGender("female")}
            >
              Female
            </Text>
          </Pressable>
        </View>
        <Pressable
          className=" bg-green-400 py-2 px-5 my-5 rounded-xl dark:bg-green-700"
          onPress={calculateBmr}
        >
          <Text className="text-white text-xl">Calculate</Text>
        </Pressable>
      </View>
      <View className="bg-white my-10 dark:bg-zinc-400">
        {bmr ? (
          <>
            <Text className="text-center text-xl pt-4 text-black dark:text-white">
              Your basal metabolic rate:
            </Text>
            <Text className="text-xl font-bold text-center pb-4 text-black dark:text-white">
              {bmr.toFixed(0)} kcal
            </Text>
          </>
        ) : null}
        <View className="w-full h-0.5 bg-zinc-200" />

        <View className="px-10 py-5">
          <View className="flex items-center mb-5">
            <AntDesign
              name="infocirlceo"
              size={30}
              color={colorScheme == "dark" ? "white" : "black"}
            />
          </View>
          <Text className="text-justify text-black dark:text-white">
            The Mifflin-St Jeor formula estimates Basal Metabolic Rate (BMR), or
            the calories your body needs at rest to maintain essential
            functions. Using weight, height, age, and gender, it provides a
            personalized calculation and is widely used today in nutrition and
            fitness planning to help set daily calorie targets and support
            health goals.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BmrCalculatorScreen;
