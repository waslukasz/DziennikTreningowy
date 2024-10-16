import { Pressable, Text } from "react-native";
type Props = {
  text: string;
  onPress: () => void;
  isSelected?: boolean; 
};
export default function PressableButton({ text, onPress,isSelected }: Props) {
    const handleOnPress=()=>{
        onPress();
    }
  return (
    <Pressable
      onPress={handleOnPress}
      className={` p-5 rounded-t-xl mx-1 text-center   ${isSelected? " bg-emerald-500 ":"bg-gray-50"}`}
    >
      <Text className={`${isSelected ?"text-white":""}`}>{text}</Text>
    </Pressable>
  );
}
