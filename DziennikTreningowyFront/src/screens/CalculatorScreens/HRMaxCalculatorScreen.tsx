import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

const HRMaxCalculator = ({ navigation }: { navigation: any }) => {
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [HRMax, setHRMax] = useState<number>();

  const maleStyle = `${
    gender === "male" ? "bg-blue-200" : "bg-gray-200"
  } w-24 py-2 rounded-l-lg`;
  const femaleStyle = `${
    gender === "female" ? "bg-pink-200" : "bg-gray-200"
  } w-24 py-2 rounded-r-lg`;
  const inputStyle =
    "text-black px-4 h-12 bg-gray-50 my-2 w-72 rounded-xl text-center";

  useEffect(() => {
    navigation.setOptions({
      title: "Heart Rate Maximum",
    });
  }, []);

  function calculateHRMax() {
    if (age && parseFloat(age) > 0) {
      if (gender == "male") {
        let temp = 208 - 0.7 * parseFloat(age);
        setHRMax(temp);
      } else {
        let temp = 210 - 0.5 * parseFloat(age);
        setHRMax(temp);
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
          value={age}
          onChangeText={(text) => {
            if (!isNaN(+text)) {
              setAge(text);
            }
          }}
          placeholderTextColor="gray"
          placeholder="Your age"
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
          onPress={calculateHRMax}
        >
          <Text className="text-white text-xl">Calculate</Text>
        </Pressable>
      </View>
      <View className="bg-white">
        {HRMax ? (
          <>
            <Text className="text-center text-xl pt-4">
              Your Heart Rate maximum:
            </Text>
            <Text className="text-xl font-bold text-center pb-4">
              {HRMax.toFixed(0)} bpm
            </Text>
          </>
        ) : null}
        <View className="w-full h-0.5 bg-black opacity-10" />
        <View className="px-10 py-5">
          <View className="flex items-center mb-5">
            <AntDesign name="infocirlceo" size={30} color="black" />
          </View>
          <Text className="text-justify">
            Maximum Heart Rate (HRMax), is the highest number of beats per
            minute (bpm) that a person's heart can achieve during maximum
            physical exertion. It serves as an important physiological parameter
            used to determine exercise intensity and tailor workout plans.
          </Text>
        </View>
      </View>
    </>
  );
};

export default HRMaxCalculator;
