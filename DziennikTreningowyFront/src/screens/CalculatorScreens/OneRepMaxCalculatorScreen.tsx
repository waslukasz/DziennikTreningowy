import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { useColorScheme } from "nativewind";
import CalculatorInput from "../../components/calculator/CalculatorInput";

const OneRepMaxCalculator = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    navigation.setOptions({
      title: "One Rep Max calculator",
    });
  }, []);
  const [weight, setWeight] = useState<string>("");
  const [reps, setReps] = useState<string>("");
  const [oneRepMax, setOneRepMax] = useState<number>();

  function calculateMax() {
    if (weight && reps && parseFloat(weight) > 0 && parseFloat(reps) > 0) {
      let oneRepMaxTemp = parseFloat(weight) * (1 + 0.0333 * parseFloat(reps));
      setOneRepMax(oneRepMaxTemp);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Enter correct data!",
      });
    }
  }

  const { colorScheme } = useColorScheme();

  return (
    <View className="bg-zinc-100 dark:bg-zinc-500 min-h-screen">
      <View className="p-5 flex items-center ">
        <CalculatorInput
          value={weight}
          setValue={setWeight}
          placeholderText={"Weight in kilograms"}
        />
        <CalculatorInput
          value={reps}
          setValue={setReps}
          placeholderText={"Repetitions"}
        />

        <Pressable
          className=" bg-green-400 py-2 px-5 mt-2 rounded-xl dark:bg-green-700"
          onPress={calculateMax}
        >
          <Text className="text-white text-xl">Calculate</Text>
        </Pressable>
      </View>
      <View className="bg-white my-10 dark:bg-zinc-400">
        {oneRepMax ? (
          <>
            <Text className="text-center text-xl pt-4 text-black dark:text-white">
              Your estimated one rep max:
            </Text>
            <Text className="text-xl font-bold text-center pb-4 text-black dark:text-white">
              {oneRepMax.toFixed(2)}kg
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
            We’re using the Epley formula to estimate the one-rep max (1RM), but
            these results are only approximate. Accuracy varies from person to
            person, as individual factors like muscle composition, experience,
            and technique all play a role.
          </Text>
        </View>
      </View>
    </View>
  );
};
export default OneRepMaxCalculator;
