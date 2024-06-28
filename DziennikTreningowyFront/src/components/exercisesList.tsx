import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  getExerciseById,
} from "../database/repositories/exercisesRepository";
import { useSQLiteContext } from "expo-sqlite";
import ExercieseInput from "./exerciseInput";
import ExercieseItem from "./exerciseItem";
import { SwipeListView } from "react-native-swipe-list-view";
import ExerciseHiddenItem from "./exerciseHiddenItem";
interface Props {
  trainingId: number;
}
export default function ExercisesList({ trainingId }: Props) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const db = useSQLiteContext();
  useEffect(() => {
    (async () => {
      getExercises();
    })();
  }, []);
  const getExercises = async () => {
    const data = await getAllExercises(db, trainingId);
    setExercises(data);
  };
  const handleCreateExercise = async (newExercise: Exercise) => {
    await createExercise(db, newExercise);
    await getExercises();
  };
  const handleDeleteExercise = async (id?: number) => {
    if (id) {
      await deleteExercise(db, id);
      await getExercises();
    }
  };
  const handleEditExercise = () => {
    console.log("Edit");
  };
  const renderHiddenItem = (data: any, rowMap: any) => {
    const exercise: Exercise = data.item;
    return (
      <ExerciseHiddenItem
        exercise={exercise}
        handleDelete={handleDeleteExercise}
        handleEdit={handleEditExercise}
      />
    );
  };

  return (
    <View className="mt-12">
      <ExercieseInput
        trainingId={trainingId}
        handleCreateExercise={handleCreateExercise}
      ></ExercieseInput>
      <SwipeListView
        numColumns={1}
        data={exercises}
        className="flex-grow-0  mt-5 h-4/6"
        renderItem={({ item }) => (
          <ExercieseItem exercise={item}></ExercieseItem>
        )}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={(item) => item.id!.toString()}
        rightOpenValue={-80}
        leftOpenValue={80}
      />
    </View>
  );
}
