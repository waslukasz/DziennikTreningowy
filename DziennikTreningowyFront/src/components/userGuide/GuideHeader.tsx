import { Text } from "react-native";
export default function GuideHeader({ text }: { text: string }) {
  return (
    <Text className="text-left w-full text-black dark:text-white text-xl font-bold mb-2">
      {text}
    </Text>
  );
}
