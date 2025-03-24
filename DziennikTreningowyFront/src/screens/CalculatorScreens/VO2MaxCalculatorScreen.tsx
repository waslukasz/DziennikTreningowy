import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "nativewind";
import CalculatorInput from "../../components/calculator/CalculatorInput";
import React from "react";

const VO2Calculator = ({ navigation }: { navigation: any }) => {
  const [distance, setDistance] = useState<string>("");
  const [VO2Max, setVO2Max] = useState<number>();
  const inputStyle =
    "text-black px-4 h-12 bg-gray-50 my-2 w-72 rounded-xl text-center";
  useEffect(() => {
    navigation.setOptions({
      title: "Maximal oxygen uptake",
    });
  }, []);
  const { colorScheme } = useColorScheme();

  function calculateVOMax() {
    //max = (d-504.9)/44.73
    if (distance && parseFloat(distance) > 0) {
      let temp = (parseFloat(distance) - 504.9) / 44.73;
      setVO2Max(temp);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Enter correct data!",
      });
    }
  }
  return (
    <View className="flex items-center pt-5 bg-zinc-100 dark:bg-zinc-500 min-h-screen">
      <CalculatorInput
        value={distance}
        setValue={setDistance}
        placeholderText={"The distance in meters"}
      />
      <Pressable
        className=" bg-green-400 py-2 px-5 my-5 rounded-xl dark:bg-green-700"
        onPress={calculateVOMax}
      >
        <Text className="text-white text-xl">Calculate</Text>
      </Pressable>
      <View className="bg-white dark:bg-zinc-400">
        {VO2Max ? (
          <>
            <Text className="text-center text-xl pt-4 dark:text-white">
              Your maximal oxygen uptake:
            </Text>
            <Text className="text-xl font-bold text-center pb-4 dark:text-white">
              {VO2Max.toFixed(2)} ml O₂/kg/min
            </Text>
          </>
        ) : null}

        <View className="w-screen h-0.5 bg-zinc-200" />
        <View className="px-10 py-5">
          <View className="flex items-center mb-5">
            <AntDesign
              name="infocirlceo"
              size={30}
              color={colorScheme == "dark" ? "white" : "black"}
            />
          </View>
          <Text className="text-justify dark:text-white">
            VO₂ max, or maximal oxygen uptake, is the maximum rate at which an
            individual’s body can utilize oxygen during intense or maximal
            physical exercise. It is a key indicator of aerobic endurance and
            cardiovascular fitness, often expressed in milliliters of oxygen
            used per kilogram of body weight per minute ( ml O₂/kg/min).
          </Text>
        </View>
      </View>
    </View>
  );
};
export default VO2Calculator;
