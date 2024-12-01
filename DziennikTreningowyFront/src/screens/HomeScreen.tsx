import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { View, TouchableOpacity as Pressable, Text } from "react-native";
import WeekTrainings from "../components/menu/weekTrainings";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View className="p-2.5 flex flex-row flex-wrap justify-around">
      <View className="border w-32 h-32 bg-white rounded-lg border-gray-300 mb-5 mx-5">
        <Pressable
          className="w-32 h-32 flex justify-center items-center"
          onPress={() => navigation.navigate("Training")}
        >
          <FontAwesome6 name="dumbbell" size={54} color="black" />
        </Pressable>
      </View>
      <View className="border w-32 h-32 bg-white rounded-lg border-gray-300 mb-5 mx-5">
        <Pressable
          className="w-32 h-32 flex justify-center items-center"
          onPress={() => navigation.navigate("BodyMeasurment")}
        >
          <FontAwesome6 name="weight-scale" size={54} color="black" />
        </Pressable>
      </View>
      <View className="border w-32 h-32 bg-white rounded-lg border-gray-300 mb-5 mx-5">
        <Pressable
          className="w-32 h-32 flex justify-center items-center"
          onPress={() => navigation.navigate("Calculators")}
        >
          <FontAwesome6 name="calculator" size={54} color="black" />
        </Pressable>
      </View>
      <View className="flex border w-full p-4 bg-white rounded-lg border-gray-300 mb-5">
        <WeekTrainings></WeekTrainings>
      </View>
    </View>
  );
};
export default HomeScreen;
