import { Pressable, Text } from "react-native";
type Props = {
  text: string;
  onPress: () => void;
};
export default function PressableButton({ text, onPress }: Props) {
    const handleOnPress=()=>{
        onPress();
    }
  return (
    <Pressable
      onPress={handleOnPress}
      className="bg-gray-50 p-5 rounded-xl mx-2 text-center "
    >
      <Text>{text}</Text>
    </Pressable>
  );
}
