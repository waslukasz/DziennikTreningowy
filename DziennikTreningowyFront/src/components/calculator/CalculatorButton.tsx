import { Pressable, View, Text } from "react-native";

export default function CalculatorButton({
  navigation,
  text,
  destination,
}: {
  navigation: any;
  text: string;
  destination: string;
}) {
  return (
    <View className="border w-32 h-32 bg-white rounded-lg border-gray-300 mb-5 mx-5 dark:bg-zinc-400 dark:border-white">
      <Pressable
        className="w-32 h-32 flex justify-center items-center"
        onPress={() => navigation.navigate(destination)}
      >
        <Text className="text-4xl font-bold text-black dark:text-white">
          {text}
        </Text>
      </Pressable>
    </View>
  );
}
