import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { View, TouchableOpacity as Pressable, StyleSheet } from "react-native";

const MenuScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View className="p-2.5 flex flex-row flex-wrap justify-around">
      <View className="border w-32 h-32 bg-white rounded-lg border-gray-300 mb-5">
        <Pressable
          className="w-32 h-32 flex justify-center items-center"
          onPress={() => navigation.navigate("Training")}
        >
          <FontAwesome6 name="dumbbell" size={54} color="black" />
        </Pressable>
      </View>
      <View className="border w-32 h-32 bg-white rounded-lg border-gray-300 mb-5">
        <Pressable
          className="w-32 h-32 flex justify-center items-center"
          onPress={() => navigation.navigate("BodyMeasurment")}
        >
          <FontAwesome6 name="weight-scale" size={54} color="black" />
        </Pressable>
      </View>
    </View>
  );
};
export default MenuScreen;
