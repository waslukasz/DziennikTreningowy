import { View, Text, Pressable } from "react-native";
import { deleteTraining } from "../database/repositories/trainingRepository";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  countExercisesInTraining,
  getAllExercises,
} from "../database/repositories/exercisesRepository";
interface Props {
  training: Training;
}
export default function TrainingItem({ training }: Props) {
  const db = useSQLiteContext();
  const [exercisiesCount, setExercisesCount] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const data = await countExercisesInTraining(db, training.id);
      if (data) setExercisesCount(data);
    })();
  });
  const trainingDate = new Date(training.timestamp);
  const dateFormat = trainingDate.toLocaleDateString("pl-PL", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
  });
  return (
    <Pressable
      className="bg-gray-100 py-5 px-2 m-4 w-5/12  rounded-xl"
      onPress={() => console.log("Pressable")}
    >
      <Text className=" text-xl">
        {dateFormat}
      </Text>
      {exercisiesCount>0 && (
        <Text className="text-sm ">{exercisiesCount} exercises</Text>
      )}
    </Pressable>
  );
}
