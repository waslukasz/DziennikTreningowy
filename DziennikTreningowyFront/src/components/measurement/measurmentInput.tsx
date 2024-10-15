import { Pressable, Text, TextInput, View } from "react-native";

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

export default function MeasurementInput() {
  return (
    <View className="px-2 flex items-center">
      <TextInput
        className={inputStyle}
        //value={name}
        //onChangeText={(text) => setName(text)}
        placeholderTextColor="gray"
        placeholder="Body weight in kilograms"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        //value={name}
        //onChangeText={(text) => setName(text)}
        placeholderTextColor="gray"
        placeholder="Neck circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        //value={name}
        //onChangeText={(text) => setName(text)}
        placeholderTextColor="gray"
        placeholder="Belly circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        //value={name}
        //onChangeText={(text) => setName(text)}
        placeholderTextColor="gray"
        placeholder="Chest circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        //value={name}
        //onChangeText={(text) => setName(text)}
        placeholderTextColor="gray"
        placeholder="Hips circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        //value={name}
        //onChangeText={(text) => setName(text)}
        placeholderTextColor="gray"
        placeholder="Bicep circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        //value={name}
        //onChangeText={(text) => setName(text)}
        placeholderTextColor="gray"
        placeholder="Thigh circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        //value={name}
        //onChangeText={(text) => setName(text)}
        placeholderTextColor="gray"
        placeholder="Waist circumference"
        keyboardType="number-pad"
      />
      <TextInput
        className={inputStyle}
        //value={name}
        //onChangeText={(text) => setName(text)}
        placeholderTextColor="gray"
        placeholder="Calf circumference"
        keyboardType="number-pad"
      />

      <View className="flex-row justify-end">
        {
          <Pressable
            className=" bg-red-400 py-2 px-5 mr-2 mt-2 rounded-xl"
            //onPress={exitFromEditMode}
          >
            <Text className="text-white text-xl">Cancel</Text>
          </Pressable>
        }
        <Pressable
          className=" bg-green-400 py-2 px-5 mt-2 rounded-xl"
          // onPress={handleCreate}
        >
          <Text className="text-white text-xl">Add</Text>
        </Pressable>
      </View>
    </View>
  );
}

const inputStyle =
  "text-black px-4 h-12 bg-gray-50 my-2 w-72 rounded-xl text-center";
