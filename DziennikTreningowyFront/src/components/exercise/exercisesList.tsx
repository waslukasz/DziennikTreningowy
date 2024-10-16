import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  updateExercise,
} from "../../database/repositories/exercisesRepository";
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
  const [exerciseToEdit, setExerciseToEdit] = useState<Exercise | null>(null);
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
  const handleEditExercise=async(editExercise:Exercise)=>{
    await updateExercise(db,editExercise);
    await getExercises();
  }
  const handleDeleteExercise = async (id?: number) => {
    if (id) {
      await deleteExercise(db, id);
      if(exerciseToEdit){
        setExerciseToEdit(null)
      }
      await getExercises();
    }
  };
  const handleEditExerciseMode = (exercise: Exercise) => {
    if (exercise != undefined) {
      setExerciseToEdit(exercise);
    }
  };
  const renderHiddenItem = (data: any, rowMap: any) => {
    const exercise: Exercise = data.item;
    return (
      <ExerciseHiddenItem
        exercise={exercise}
        handleDelete={handleDeleteExercise}
        handleEdit={handleEditExerciseMode}
      />
    );
  };
  const closeEditMode = () => {
    setExerciseToEdit(null);
  };
  return (
    <View className="mt-12">
      <ExercieseInput
      handleEditExercise={handleEditExercise}
        handleCloseEditMode={closeEditMode}
        exerciseToEdit={exerciseToEdit}
        trainingId={trainingId}
        handleCreateExercise={handleCreateExercise}
      ></ExercieseInput>
      <SwipeListView
        numColumns={1}
        data={exercises}
        className="flex-grow-0  m-2 mt-5 rounded-xl   "
        renderItem={({ item }) => (
          <ExercieseItem exercise={item}></ExercieseItem>
        )}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={(item) => item.id!.toString()}
        rightOpenValue={-180}
        disableRightSwipe={true}
        stopRightSwipe={-180}
      />
    </View>
  );
}
