import { Pressable, Text, TextInput, View } from "react-native";
import { createBodyMeasurements } from "../../database/repositories/bodyMeasurementRepository";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import Toast from "react-native-toast-message";

// type BodyMeasurements = {
//   id?: number;
//   measurementDate?: Date;
//   neck: number;
//   abdomen: belly;
//   chest: number;
//   hips: number;
//   bicep: number;
//   thigh: number;
//   waist: number;
//   calf: number;
// };circumference
const test: BodyMeasurements = {
  measurementDate: new Date("2024-10-14"),
  neck: 55.2,
  belly: 234.1,
  chest: 122.5,
  hips: 111.6,
  bicep: 54.5,
  thigh: 75.3,
  waist: 45.7,
  calf: 49.2,
  bodyWeight: 90.13,
};
const bodyMeasurementsArray: BodyMeasurements[] = [
  {
    id: 1,
    measurementDate: new Date("2024-10-14"),
    neck: 35.2,
    belly: 90.1,
    chest: 102.5,
    hips: 95.6,
    bicep: 34.5,
    thigh: 55.3,
    waist: 85.7,
    calf: 39.2,
    bodyWeight: 80,
  },
  {
    id: 2,
    measurementDate: new Date("2024-10-13"),
    neck: 36.4,
    belly: 89.7,
    chest: 103.3,
    hips: 96.2,
    bicep: 35.1,
    thigh: 54.9,
    waist: 84.3,
    calf: 38.5,
    bodyWeight: 90,
  },
  {
    id: 3,
    measurementDate: new Date("2024-10-12"),
    neck: 34.8,
    belly: 91.0,
    chest: 101.9,
    hips: 94.5,
    bicep: 33.9,
    thigh: 55.0,
    waist: 86.1,
    calf: 39.0,
    bodyWeight: 96,
  },
];
export default function MeasurementInput({ navigation }: { navigation: any }) {
  const [neck, setNeck] = useState<string>("");
  const [belly, setBelly] = useState<string>("");
  const [chest, setChest] = useState<string>("");
  const [hips, setHips] = useState<string>("");
  const [bicep, setBicep] = useState<string>("");
  const [thigh, setThigh] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [calf, setCalf] = useState<string>("");
  const [bodyWeight, setBodyWeight] = useState<string>("");

  const db = useSQLiteContext();

  const fieldsContentChecker = () => {
    if (
      neck &&
      belly &&
      chest &&
      hips &&
      bicep &&
      thigh &&
      waist &&
      calf &&
      bodyWeight
    ) {
      handleCreateBodyMeasurement();
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "Please fill all fields!",
      });
    }
  };

  const handleCreateBodyMeasurement = () => {
    const newMeasurement: BodyMeasurements = {
      measurementDate: new Date(),
      neck: parseFloat(neck),
      belly: parseFloat(belly),
      chest: parseFloat(chest),
      hips: parseFloat(hips),
      bicep: parseFloat(bicep),
      thigh: parseFloat(thigh),
      waist: parseFloat(waist),
      calf: parseFloat(calf),
      bodyWeight: parseFloat(bodyWeight),
    };
    createBodyMeasurements(db, newMeasurement);
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Successfully added measurements!",
    });
    navigation.navigate("BodyMeasurment");
  };

  return (
    <View className="px-2 flex items-center">
      <TextInput
        className={inputStyle}
        value={bodyWeight}
        onChangeText={(text) => {
          if (!isNaN(+text)) {
            setBodyWeight(text);
          }
          1;
        }}
        placeholderTextColor="gray"
        placeholder="Body weight in kilograms"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        value={neck}
        onChangeText={(text) => {
          if (!isNaN(+text)) {
            setNeck(text);
          }
        }}
        placeholderTextColor="gray"
        placeholder="Neck circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        value={belly}
        onChangeText={(text) => {
          if (!isNaN(+text)) {
            setBelly(text);
          }
        }}
        placeholderTextColor="gray"
        placeholder="Belly circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        value={chest}
        onChangeText={(text) => {
          if (!isNaN(+text)) {
            setChest(text);
          }
        }}
        placeholderTextColor="gray"
        placeholder="Chest circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        value={hips}
        onChangeText={(text) => {
          if (!isNaN(+text)) {
            setHips(text);
          }
        }}
        placeholderTextColor="gray"
        placeholder="Hips circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        value={bicep}
        onChangeText={(text) => {
          if (!isNaN(+text)) {
            setBicep(text);
          }
        }}
        placeholderTextColor="gray"
        placeholder="Bicep circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        value={thigh}
        onChangeText={(text) => {
          if (!isNaN(+text)) {
            setThigh(text);
          }
        }}
        placeholderTextColor="gray"
        placeholder="Thigh circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        value={waist}
        onChangeText={(text) => {
          if (!isNaN(+text)) {
            setWaist(text);
          }
        }}
        placeholderTextColor="gray"
        placeholder="Waist circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        value={calf}
        onChangeText={(text) => {
          if (!isNaN(+text)) {
            setCalf(text);
          }
        }}
        placeholderTextColor="gray"
        placeholder="Calf circumference"
        keyboardType="number-pad"
      />

      <View className="flex-row justify-end">
        {
          <Pressable
            className=" bg-red-400 py-2 px-5 mr-2 mt-2 rounded-xl"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white text-xl">Cancel</Text>
          </Pressable>
        }
        <Pressable
          className=" bg-green-400 py-2 px-5 mt-2 rounded-xl"
          // onPress={() => showToast()}
        >
          <Text className="text-white text-xl" onPress={fieldsContentChecker}>
            Add
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const inputStyle =
  "text-black px-4 h-12 bg-gray-50 my-2 w-72 rounded-xl text-center";
