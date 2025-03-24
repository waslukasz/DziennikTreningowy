import { Text } from "react-native";
export default function GuideList({ text }: { text: string }) {
  return (
    <Text className="text-justify w-full text-black dark:text-white text-base pl-2 mb-6">
      {"\u2B24 "}
      {text}
    </Text>
  );
}
