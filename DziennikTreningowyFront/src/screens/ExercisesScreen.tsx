import { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  updateExercise,
} from "../database/repositories/exercisesRepository";
import ExerciseHiddenItem from "../components/exercise/exerciseHiddenItem";
import ExercieseInput from "../components/exercise/exerciseInput";
import ExercieseItem from "../components/exercise/exerciseItem";
import { ExerciseScreenProps } from "../types/navigationStackParms";
import Toast from "react-native-toast-message";
export default function ExercisesScreen({
  navigation,
  route,
}: ExerciseScreenProps) {
  const { trainingId } = route.params;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseToEdit, setExerciseToEdit] = useState<Exercise | null>(null);
  useEffect(() => {
    (async () => {
      getExercises();
    })();
  }, []);
  const getExercises = async () => {
    const data = await getAllExercises(trainingId);
    setExercises(data);
  };
  const handleCreateExercise = async (newExercise: Exercise) => {
    const result = await createExercise(newExercise);
    if (result) {
      await getExercises();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Successfully added exercise!",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };
  const handleEditExercise = async (editExercise: Exercise) => {
    const result = await updateExercise(editExercise);
    if (result) {
      await getExercises();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Successfully edited exercise!",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }
  };
  const handleDeleteExercise = async (id?: number) => {
    if (id) {
      const result = await deleteExercise(id);
      if (result) {
        if (exerciseToEdit) {
          setExerciseToEdit(null);
        }
        await getExercises();
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Successfully deleted exercise!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something went wrong",
        });
      }
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="mt-12 flex-1">
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
    </TouchableWithoutFeedback>
  );
}
