import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Text, View } from "react-native";
interface Props {
  exercise: Exercise;
  setExerciseToDone: (id: number, isDone: boolean) => void;
}
export default function ExercieseItem({ exercise, setExerciseToDone }: Props) {
  const handleExerciseSetToDone = () => {
    if (exercise.id) {
      setExerciseToDone(exercise.id, !!exercise.isDone);
    }
  };

  return (
    <View className="bg-gray-50 mb-1 p-2 border shadow border-gray-300   rounded-xl ">
      <View className="flex flex-row justify-between">
        <Text className="font-bold pl-1">{exercise.name}</Text>
        <Checkbox
          value={!!exercise.isDone}
          color={"green"}
          className=" rounded-2xl"
           
          onValueChange={handleExerciseSetToDone}
        ></Checkbox>
      </View>
      <View className="flex-col  ">
        <Text className="p-1 text-gray-400">
          {exercise.repetitions} X {exercise.sets} Set{" "}
        </Text>
      </View>
    </View>
  );
}
