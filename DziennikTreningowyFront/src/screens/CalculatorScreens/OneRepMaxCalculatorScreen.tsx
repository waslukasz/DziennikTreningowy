import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import AntDesign from "@expo/vector-icons/AntDesign";

const OneRepMaxCalculator = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    navigation.setOptions({
      title: "One Rep Max calculator",
    });
  }, []);
  const inputStyle =
    "text-black px-4 h-12 bg-gray-50 my-2 w-72 rounded-xl text-center";

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

  return (
    <>
      <View className="p-5 flex items-center">
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

        <TextInput
          className={inputStyle}
          value={reps}
          onChangeText={(text) => {
            if (!isNaN(+text)) {
              setReps(text);
            }
          }}
          placeholderTextColor="gray"
          placeholder="Repetitions"
          keyboardType="number-pad"
        />
        <Pressable
          className=" bg-green-400 py-2 px-5 mt-2 rounded-xl"
          onPress={calculateMax}
        >
          <Text className="text-white text-xl">Calculate</Text>
        </Pressable>
      </View>
      <View className="bg-white my-10">
        {oneRepMax ? (
          <>
            <Text className="text-center text-xl pt-4">
              Your estimated one rep max:
            </Text>
            <Text className="text-xl font-bold text-center pb-4">
              {oneRepMax.toFixed(2)}kg
            </Text>
          </>
        ) : null}
        <View className="w-full h-0.5 bg-black opacity-10" />

        <View className="px-10 py-5">
          <View className="flex items-center mb-5">
            <AntDesign name="infocirlceo" size={30} color="black" />
          </View>
          <Text className="text-justify">
            We’re using the Epley formula to estimate the one-rep max (1RM), but
            these results are only approximate. Accuracy varies from person to
            person, as individual factors like muscle composition, experience,
            and technique all play a role.
          </Text>
        </View>
      </View>
    </>
  );
};
export default OneRepMaxCalculator;
