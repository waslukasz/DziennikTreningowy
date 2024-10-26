import { Pressable, Text, TextInput, View } from "react-native";
import { createBodyMeasurements } from "../../database/repositories/bodyMeasurementRepository";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { BodyMeasurements } from "../../types/bodyMeasurementsType";
import { BodyPartEnum } from "../../types/bodyPartEnum";

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
    handleCreateBodyMeasurement();
  };

  const handleCreateBodyMeasurement = () => {
    if (neck) {
      let newMeasurement: BodyMeasurements = {
        date: new Date(),
        bodyPart: BodyPartEnum.neck,
        value: parseFloat(neck),
      };
      createBodyMeasurements(newMeasurement);
    }

    if (belly) {
      let newMeasurement: BodyMeasurements = {
        date: new Date(),
        bodyPart: BodyPartEnum.belly,
        value: parseFloat(belly),
      };
      createBodyMeasurements(newMeasurement);
    }

    if (chest) {
      let newMeasurement: BodyMeasurements = {
        date: new Date(),
        bodyPart: BodyPartEnum.chest,
        value: parseFloat(chest),
      };
      createBodyMeasurements(newMeasurement);
    }

    if (hips) {
      let newMeasurement: BodyMeasurements = {
        date: new Date(),
        bodyPart: BodyPartEnum.hips,
        value: parseFloat(hips),
      };
      createBodyMeasurements(newMeasurement);
    }

    if (bicep) {
      let newMeasurement: BodyMeasurements = {
        date: new Date(),
        bodyPart: BodyPartEnum.bicep,
        value: parseFloat(bicep),
      };
      createBodyMeasurements(newMeasurement);
    }

    if (thigh) {
      let newMeasurement: BodyMeasurements = {
        date: new Date(),
        bodyPart: BodyPartEnum.thigh,
        value: parseFloat(thigh),
      };
      createBodyMeasurements(newMeasurement);
    }

    if (waist) {
      let newMeasurement: BodyMeasurements = {
        date: new Date(),
        bodyPart: BodyPartEnum.waist,
        value: parseFloat(waist),
      };
      createBodyMeasurements(newMeasurement);
    }

    if (calf) {
      let newMeasurement: BodyMeasurements = {
        date: new Date(),
        bodyPart: BodyPartEnum.calf,
        value: parseFloat(calf),
      };
      createBodyMeasurements(newMeasurement);
    }

    if (bodyWeight) {
      let newMeasurement: BodyMeasurements = {
        date: new Date(),
        bodyPart: BodyPartEnum.bodyWeight,
        value: parseFloat(bodyWeight),
      };
      createBodyMeasurements(newMeasurement);
    }

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
        <Pressable className=" bg-green-400 py-2 px-5 mt-2 rounded-xl">
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
