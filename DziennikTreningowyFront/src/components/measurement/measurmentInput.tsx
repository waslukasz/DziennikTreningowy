import { Pressable, Text, TextInput, View } from "react-native";
import { createBodyMeasurements } from "../../database/repositories/bodyMeasurementRepository";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { BodyMeasurements } from "../../types/bodyMeasurementsType";
import { BodyPartEnum } from "../../types/bodyPartEnum";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function MeasurementInput({
  navigation,
  measurementPart,
}: {
  navigation: any;
  measurementPart: BodyPartEnum;
}) {
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
      await createBodyMeasurements(temp);
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
    <View className="px-2 flex items-center pt-10">
      <MaterialCommunityIcons name={icon} size={150} color="#69cf11" />
      <TextInput
        className={
          "text-black px-4 h-12 bg-gray-50 my-2 w-72 rounded-xl text-center"
        }
        value={value}
        onChangeText={(text) => {
          if (!isNaN(+text)) {
            setValue(text);
          }
        }}
        placeholderTextColor="gray"
        placeholder={placeholder}
        keyboardType="number-pad"
      />
      <Pressable className=" bg-green-400 py-2 px-5 mt-2 rounded-xl">
        <Text className="text-white text-xl" onPress={addValue}>
          Add
        </Text>
      </Pressable>
    </View>
  );
}
