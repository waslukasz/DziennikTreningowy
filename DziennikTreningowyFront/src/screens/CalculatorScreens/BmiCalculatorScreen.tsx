import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

const BmiCalculatorScreen = ({ navigation }: { navigation: any }) => {
  const [bodyWeight, setBodyWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [bmi, setBmi] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      title: "BMI calculator",
    });
  }, []);
  function calculateBmi() {
    if (
      height &&
      bodyWeight &&
      parseFloat(height) > 0 &&
      parseFloat(bodyWeight) > 0
    ) {
      let heightInMeters = parseFloat(height!) / 100;
      let bmiTemp = parseFloat(bodyWeight!) / heightInMeters ** 2;
      AsyncStorage.removeItem("hasSeenLaunchScreen");
      setBmi(bmiTemp);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Enter correct data!",
      });
    }
  }

  const bmiInfoStyle = "px-10 py-8";
  const bmiInfoSelectedStyle = "px-10 py-8 bg-blue-50";

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
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
        <Pressable
          className=" bg-green-400 py-2 px-5 mt-2 rounded-xl"
          onPress={calculateBmi}
        >
          <Text className="text-white text-xl">Calculate</Text>
        </Pressable>
      </View>
      <View className="bg-white my-10">
        {bmi ? (
          <>
            <Text className="text-center text-xl pt-4">Your bmi:</Text>
            <Text className="text-xl font-bold text-center pb-4">
              {bmi.toFixed(2)}
            </Text>
          </>
        ) : null}
        <View className="w-full h-0.5 bg-black opacity-10" />
        <View
          className={
            bmi < 18.5 && bmi > 0 ? bmiInfoSelectedStyle : bmiInfoStyle
          }
        >
          <Text className="font-bold">Less than 18.5 — Underweight</Text>
          <Text className="text-justify">
            This range suggests that a person may be underweight. Possible
            health implications include a weakened immune system, nutrient
            deficiencies, and an increased risk of osteoporosis.
          </Text>
        </View>
        <View className="w-full h-0.5 bg-black opacity-10" />

        <View
          className={
            bmi >= 18.5 && bmi <= 24.9 ? bmiInfoSelectedStyle : bmiInfoStyle
          }
        >
          <Text className="font-bold">18.5–24.9 — Normal weight</Text>
          <Text className="text-justify">
            This range indicates a healthy body weight in proportion to height
            and generally corresponds with a lower risk of obesity-related
            health conditions.
          </Text>
        </View>
        <View className="w-full h-0.5 bg-black opacity-10" />

        <View
          className={
            bmi >= 25 && bmi <= 29.9 ? bmiInfoSelectedStyle : bmiInfoStyle
          }
        >
          <Text className="font-bold">25–29.9 — Overweight</Text>
          <Text className="text-justify">
            This range suggests a higher-than-ideal body weight. While not
            necessarily linked to immediate health risks, being overweight can
            increase the risk of conditions like hypertension, diabetes, and
            heart disease if not managed.
          </Text>
        </View>
        <View className="w-full h-0.5 bg-black opacity-10" />

        <View
          className={
            bmi >= 30 && bmi <= 34.9 ? bmiInfoSelectedStyle : bmiInfoStyle
          }
        >
          <Text className="font-bold">30–34.9 — Obesity (Class 1)</Text>
          <Text className="text-justify">
            This category represents moderate obesity, where health risks, such
            as type 2 diabetes, cardiovascular diseases, and joint problems,
            become more prevalent.
          </Text>
        </View>
        <View className="w-full h-0.5 bg-black opacity-10" />

        <View
          className={
            bmi >= 35 && bmi <= 39.9 ? bmiInfoSelectedStyle : bmiInfoStyle
          }
        >
          <Text className="font-bold">35–39.9 — Obesity (Class 2)</Text>
          <Text className="text-justify">
            This indicates a more severe level of obesity, often associated with
            higher risks of serious health issues, including diabetes, heart
            disease, and certain types of cancer.
          </Text>
        </View>
        <View className="w-full h-0.5 bg-black opacity-10" />

        <View className={bmi >= 40 ? bmiInfoSelectedStyle : bmiInfoStyle}>
          <Text className="font-bold">≥ 40 — Extreme obesity (Class 3)</Text>
          <Text className="text-justify">
            Also known as morbid obesity, this category is linked to the highest
            risk of severe health complications and may significantly affect
            quality of life.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default BmiCalculatorScreen;
const inputStyle =
  "text-black px-4 h-12 bg-gray-50 my-2 w-72 rounded-xl text-center";
