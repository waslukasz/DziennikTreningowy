import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import AntDesign from "@expo/vector-icons/AntDesign";

const BmrCalculatorScreen = ({ navigation }: { navigation: any }) => {
  const [bodyWeight, setBodyWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [bmr, setBmr] = useState<number>();

  useEffect(() => {
    navigation.setOptions({
      title: "Basal metabolic rate calculator",
    });
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
    <>
      <View className="p-5 flex items-center">
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
          value={age}
          onChangeText={(text) => {
            if (!isNaN(+text)) {
              setAge(text);
            }
          }}
          placeholderTextColor="gray"
          placeholder="Age"
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
          className=" bg-green-400 py-2 px-5 my-5 rounded-xl"
          onPress={calculateBmr}
        >
          <Text className="text-white text-xl">Calculate</Text>
        </Pressable>
      </View>
      <View className="bg-white">
        {bmr ? (
          <>
            <Text className="text-center text-xl pt-4">
              Your basal metabolic rate:
            </Text>
            <Text className="text-xl font-bold text-center pb-4">
              {bmr.toFixed(0)} kcal
            </Text>
          </>
        ) : null}
        <View className="w-full h-0.5 bg-black opacity-10" />

        <View className="px-10 py-5">
          <View className="flex items-center mb-5">
            <AntDesign name="infocirlceo" size={30} color="black" />
          </View>
          <Text className="text-justify">
            The Mifflin-St Jeor formula estimates Basal Metabolic Rate (BMR), or
            the calories your body needs at rest to maintain essential
            functions. Using weight, height, age, and gender, it provides a
            personalized calculation and is widely used today in nutrition and
            fitness planning to help set daily calorie targets and support
            health goals.
          </Text>
        </View>
      </View>
    </>
  );
};

export default BmrCalculatorScreen;
const inputStyle =
  "text-black px-4 h-12 bg-gray-50 my-2 w-72 rounded-xl text-center";
