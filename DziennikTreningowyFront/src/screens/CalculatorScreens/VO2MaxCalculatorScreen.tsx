import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import AntDesign from "@expo/vector-icons/AntDesign";

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
    <View className="p-5 flex items-center">
      <TextInput
        className={inputStyle}
        value={distance}
        onChangeText={(text) => {
          if (!isNaN(+text)) {
            setDistance(text);
          }
        }}
        placeholderTextColor="gray"
        placeholder="The distance in meters."
        keyboardType="number-pad"
      />
      <Pressable
        className=" bg-green-400 py-2 px-5 my-5 rounded-xl"
        onPress={calculateVOMax}
      >
        <Text className="text-white text-xl">Calculate</Text>
      </Pressable>
      <View className="bg-white">
        {VO2Max ? (
          <>
            <Text className="text-center text-xl pt-4">
              Your maximal oxygen uptake:
            </Text>
            <Text className="text-xl font-bold text-center pb-4">
              {VO2Max.toFixed(2)} ml O₂/kg/min
            </Text>
          </>
        ) : null}
        <View className="w-full h-0.5 bg-black opacity-10" />

        <View className="px-10 py-5">
          <View className="flex items-center mb-5">
            <AntDesign name="infocirlceo" size={30} color="black" />
          </View>
          <Text className="text-justify">
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
