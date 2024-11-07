import { Pressable, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const CalculatorsScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View className="p-2.5 flex flex-row flex-wrap justify-around">
      <View className="border w-32 h-32 bg-white rounded-lg border-gray-300 mb-5 mx-5">
        <Pressable
          className="w-32 h-32 flex justify-center items-center"
          onPress={() => navigation.navigate("BmiCalculator")}
        >
          <Text className="text-4xl font-bold">BMI</Text>
        </Pressable>
      </View>

      <View className="border w-32 h-32 bg-white rounded-lg border-gray-300 mb-5 mx-5">
        <Pressable
          className="w-32 h-32 flex justify-center items-center"
          onPress={() => navigation.navigate("OneRepMaxCalculator")}
        >
          <Text className="text-4xl font-bold">1RM</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CalculatorsScreen;
