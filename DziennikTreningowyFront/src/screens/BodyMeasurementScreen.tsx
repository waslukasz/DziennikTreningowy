// type BodyMeasurements = {
//   id?: number;
//   measurementDate?: Date;
//   neck: number;
//   abdomen: number;
//   chest: number;
//   hips: number;
//   bicep: number;
//   thigh: number;
//   waist: number;
//   calf: number;
// };

import { Pressable, Text, View } from "react-native";

const BodyMeasurementScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View className="flex">
      <View className=" m-5 flex-row justify-between items-center">
        <Text className="text-2xl ">Add measurement</Text>

        <Pressable
          onPress={() => navigation.navigate("AddMeasurement")}
          className="bg-emerald-500 p-3 rounded-xl w-14 h-14 flex justify-center"
        >
          <Text className="text-3xl text-white text-center">+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BodyMeasurementScreen;
