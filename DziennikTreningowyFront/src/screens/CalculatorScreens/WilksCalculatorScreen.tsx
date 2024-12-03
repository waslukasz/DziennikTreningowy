import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import AntDesign from "@expo/vector-icons/AntDesign";

const WilksCalculatorScreen = ({ navigation }: { navigation: any }) => {
  const [benchPressWeight, setBenchPressWeight] = useState<string>("");
  const [squatWeight, setsquatWeight] = useState<string>("");
  const [deadliftWeight, setdeadliftWeight] = useState<string>("");
  const [bodyWeight, setBodyWeight] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [wilks, setWilks] = useState<number>();

  const inputStyle =
    "text-black px-4 h-12 bg-gray-50 my-2 w-72 rounded-xl text-center";
  const maleStyle = `${
    gender === "male" ? "bg-blue-200" : "bg-gray-200"
  } w-24 py-2 rounded-l-lg`;
  const femaleStyle = `${
    gender === "female" ? "bg-pink-200" : "bg-gray-200"
  } w-24 py-2 rounded-r-lg`;
  useEffect(() => {
    navigation.setOptions({
      title: "Wilks Score calculator",
    });
  }, []);

  function calculateWilks() {
    if (
      bodyWeight &&
      benchPressWeight &&
      deadliftWeight &&
      squatWeight &&
      parseFloat(benchPressWeight) > 0 &&
      parseFloat(bodyWeight) > 0 &&
      parseFloat(squatWeight) > 0 &&
      parseFloat(deadliftWeight) > 0
    ) {
      let totalLifts =
        parseFloat(benchPressWeight) +
        parseFloat(deadliftWeight) +
        parseFloat(squatWeight);
      if (gender == "male") {
        const coefficients = {
          a: -216.0475144,
          b: 16.2606339,
          c: -0.002388645,
          d: -0.00113732,
          e: 7.01863e-6,
          f: -1.291e-8,
        };
        const denominator =
          coefficients.a +
          coefficients.b * parseFloat(bodyWeight) +
          coefficients.c * Math.pow(parseFloat(bodyWeight), 2) +
          coefficients.d * Math.pow(parseFloat(bodyWeight), 3) +
          coefficients.e * Math.pow(parseFloat(bodyWeight), 4) +
          coefficients.f * Math.pow(parseFloat(bodyWeight), 5);
        let coeff = 500.0 / denominator;
        setWilks(totalLifts * coeff);
      } else {
        const coefficients = {
          a: 594.31747775582,
          b: -27.23842536447,
          c: 0.82112226871,
          d: -0.00930733913,
          e: 4.731582e-5,
          f: -9.054e-8,
        };
        const denominator =
          coefficients.a +
          coefficients.b * parseFloat(bodyWeight) +
          coefficients.c * Math.pow(parseFloat(bodyWeight), 2) +
          coefficients.d * Math.pow(parseFloat(bodyWeight), 3) +
          coefficients.e * Math.pow(parseFloat(bodyWeight), 4) +
          coefficients.f * Math.pow(parseFloat(bodyWeight), 5);
        let coeff = 500.0 / denominator;
        setWilks(totalLifts * coeff);
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
    <ScrollView keyboardShouldPersistTaps="handled">
      <View className="p-5 flex items-center">
        <TextInput
          className={inputStyle}
          value={benchPressWeight}
          onChangeText={(text) => {
            if (!isNaN(+text)) {
              setBenchPressWeight(text);
            }
          }}
          placeholderTextColor="gray"
          placeholder="Maximum bench press"
          keyboardType="number-pad"
        />
        <TextInput
          className={inputStyle}
          value={squatWeight}
          onChangeText={(text) => {
            if (!isNaN(+text)) {
              setsquatWeight(text);
            }
          }}
          placeholderTextColor="gray"
          placeholder="Maximum squat"
          keyboardType="number-pad"
        />
        <TextInput
          className={inputStyle}
          value={deadliftWeight}
          onChangeText={(text) => {
            if (!isNaN(+text)) {
              setdeadliftWeight(text);
            }
          }}
          placeholderTextColor="gray"
          placeholder="Maximum deadlift"
          keyboardType="number-pad"
        />
        <TextInput
          className={inputStyle}
          value={bodyWeight}
          onChangeText={(text) => {
            if (!isNaN(+text)) {
              setBodyWeight(text);
            }
          }}
          placeholderTextColor="gray"
          placeholder="Body weight in kilograms"
          keyboardType="number-pad"
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
          className=" bg-green-400 py-2 px-5 mt-2 rounded-xl"
          onPress={calculateWilks}
        >
          <Text className="text-white text-xl">Calculate</Text>
        </Pressable>
      </View>
      <View className="bg-white">
        {wilks ? (
          <>
            <Text className="text-center text-xl pt-4">Your Wilks Score:</Text>
            <Text className="text-xl font-bold text-center pb-4">
              {wilks.toFixed(2)}
            </Text>
          </>
        ) : null}
        <View className="w-full h-0.5 bg-black opacity-10" />

        <View className="px-10 py-5">
          <View className="flex items-center mb-5">
            <AntDesign name="infocirlceo" size={30} color="black" />
          </View>
          <Text className="text-justify">
            The Wilks Score is a formula used in powerlifting to compare the
            strength of lifters of different body weights. It calculates a
            coefficient based on the lifter's body weight, which is then
            multiplied by their total lifted weight across key lifts (squat,
            bench press, and deadlift). This provides a standardized score,
            allowing athletes of different weights to compete on an equal
            playing field. Developed by Robert Wilks, the formula is widely used
            in competitions to determine overall strength independent of body
            weight.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default WilksCalculatorScreen;
