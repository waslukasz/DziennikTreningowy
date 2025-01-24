import { useContext, useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  getAllExercisesByTrainingId,
  setDoneStatusInExercise,
  updateExercise,
} from "../database/repositories/exercisesRepository";
import ExerciseHiddenItem from "../components/exercise/exerciseHiddenItem";
import ExercieseInput from "../components/exercise/exerciseInput";
import ExercieseItem from "../components/exercise/exerciseItem";
import { ExerciseScreenProps } from "../types/navigationStackParms";
import Toast from "react-native-toast-message";
import { AuthContext } from "../components/auth/authContext";
export default function ExercisesScreen({
  navigation,
  route,
}: ExerciseScreenProps) {
  const auth=useContext(AuthContext);
  const { trainingId } = route.params;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseToEdit, setExerciseToEdit] = useState<Exercise | null>(null);
  useEffect(() => {
    (async () => {
      getExercises();
    })();
  }, []);
  const getExercises = async () => {
    const data = await getAllExercisesByTrainingId(trainingId);
    setExercises(data);
  };
  const handleCreateExercise = async (newExercise: Exercise) => {
    const result = await createExercise(newExercise,auth.isAuthenticated);
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
    const result = await updateExercise(editExercise,auth.isAuthenticated);
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
  const handleDeleteExercise = async (id?: string) => {
    if (id) {
      const result = await deleteExercise(id,auth.isAuthenticated);
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
  const setExerciseToDone = async (id: string, isDone: boolean) => {
    const result = await setDoneStatusInExercise(id, isDone);
    await getExercises();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="pt-12 flex-1 bg-zinc-100 dark:bg-zinc-500 min-h-screen">
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
          className="flex-grow-0 flex-1  m-2 mt-5 rounded-xl   "
          renderItem={({ item }) => (
            <ExercieseItem
              exercise={item}
              setExerciseToDone={setExerciseToDone}
            ></ExercieseItem>
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
