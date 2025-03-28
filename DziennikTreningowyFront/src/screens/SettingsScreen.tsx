import { Button, Pressable, Switch, Text, View } from "react-native";
import { useColorScheme } from "nativewind";

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="p-5 bg-zinc-100 dark:bg-zinc-500 h-screen items-center">
      <Pressable
        className=" w-5/6 justify-center flex-row items-center bg-white border-zinc-200 border rounded-md dark:bg-zinc-400 my-3 h-12"
        onPress={() => navigation.navigate("UserGuide")}
      >
        <Text className="text-black dark:text-white text-xl">User guide</Text>
      </Pressable>
      <View className=" w-5/6 justify-center flex-row items-center bg-white border-zinc-200 border rounded-md dark:bg-zinc-400 my-3 h-12">
        <Text className="text-black dark:text-white text-xl">
          App version: 1.0.0
        </Text>
      </View>
      <View className=" w-5/6 justify-center flex-row items-center bg-white border-zinc-200 border rounded-md dark:bg-zinc-400 my-3 h-12">
        <Text className="text-black dark:text-white text-xl mr-5">
          Dark mode
        </Text>
        <Switch
          value={colorScheme == "dark"}
          onChange={toggleColorScheme}
          thumbColor={"#52525b"}
          trackColor={{ false: "#a3a3a3", true: "white" }}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
