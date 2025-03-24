import { Text } from "react-native";
export default function GuideText({ text }: { text: string }) {
  return (
    <Text className="text-justify w-full text-black dark:text-white text-base p-2 font-bold">
      {text}
    </Text>
  );
}
