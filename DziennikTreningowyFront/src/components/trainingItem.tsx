import { View, Text, Pressable } from "react-native";
interface Props {
  training: Training;
}
export default function TrainingItem({ training }: Props) {
    return (
    <Pressable className="bg-gray-100 m-3 w-5/12 py-10 items-center rounded-xl" onPress={() => console.log("pres")}>
        <Text className="text-xl">{training.timestamp.toString()}</Text>
    </Pressable>
  );
}
