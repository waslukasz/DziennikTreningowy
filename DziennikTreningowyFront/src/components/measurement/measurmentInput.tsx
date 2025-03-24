import { Pressable, Text, TextInput, View } from "react-native";
import { createBodyMeasurements } from "../../database/repositories/bodyMeasurementRepository";
import { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { BodyMeasurements } from "../../types/bodyMeasurementsType";
import { BodyPartEnum } from "../../types/bodyPartEnum";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "nativewind";
import CalculatorInput from "../calculator/CalculatorInput";
import { AuthContext } from "../auth/authContext";

export default function MeasurementInput({
  navigation,
  measurementPart,
}: {
  navigation: any;
  measurementPart: BodyPartEnum;
}) {
  const auth=useContext(AuthContext);
  const { colorScheme } = useColorScheme();
  const placeholder =
    measurementPart === BodyPartEnum.bodyWeight
      ? "Body weight in kilograms"
      : measurementPart.toString()[0].toUpperCase() +
        measurementPart.slice(1) +
        " in centimeters";
  const [value, setValue] = useState("");
  const icon =
    measurementPart === BodyPartEnum.bodyWeight
      ? "scale-bathroom"
      : "tape-measure";
  async function addValue() {
    if (value) {
      let temp: BodyMeasurements = {
        date: new Date(),
        bodyPart: measurementPart,
        value: parseFloat(value),
      };
      await createBodyMeasurements(temp,auth.isAuthenticated);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Added measurement",
      });
      navigation.goBack();
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Enter correct data!",
      });
    }
  }

  return (
    <View className="px-2 flex items-center pt-10 bg-zinc-100 dark:bg-zinc-500 min-h-screen">
      <MaterialCommunityIcons
        name={icon}
        size={150}
        color={colorScheme == "dark" ? "white" : "#69cf11"}
      />
      <CalculatorInput
        value={value}
        setValue={setValue}
        placeholderText={placeholder}
      />
      <Pressable className=" bg-green-400 py-2 px-5 mt-2 rounded-xl dark:bg-green-700">
        <Text className="text-white text-xl" onPress={addValue}>
          Add
        </Text>
      </Pressable>
    </View>
  );
}
