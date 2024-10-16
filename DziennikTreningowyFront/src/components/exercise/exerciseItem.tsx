import {  Text, View } from "react-native";
interface Props {
  exercise: Exercise;
}
export default function ExercieseItem({ exercise }: Props) {
  return (
    <View className="bg-gray-50 my-2   p-2 shadow border-gray-300  rounded-xl  flex ">
      <Text className="font-bold p-1">{exercise.name}</Text>
      <Text className="p-1 text-gray-400">
        {exercise.repetitions} X {exercise.sets} Set{" "}
      </Text>
    </View>
  );
}
