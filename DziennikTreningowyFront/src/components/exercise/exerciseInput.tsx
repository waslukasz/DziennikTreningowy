import Checkbox from "expo-checkbox";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Toast from "react-native-toast-message";
interface Props {
  trainingId: number;
  exerciseToEdit?: Exercise | null;
  handleCloseEditMode: () => void;
  handleEditExercise: (updateExercise: Exercise) => void;
  handleCreateExercise: (newExervise: Exercise) => void;
}
export default function ExercieseInput({
  trainingId,
  exerciseToEdit,
  handleCloseEditMode,
  handleCreateExercise,
  handleEditExercise,
}: Props) {
  const [name, setName] = useState("");
  const [repetition, setRepetition] = useState<number>();
  const [sets, setSets] = useState<number>();
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    if (exerciseToEdit) {
      setName(exerciseToEdit.name);
      setRepetition(exerciseToEdit.repetitions);
      setSets(exerciseToEdit.sets);
    }
  }, [exerciseToEdit]);
  const handleCreate = () => {
    const newExercise: Exercise = {
      id: exerciseToEdit ? exerciseToEdit?.id : undefined,
      name: name,
      repetitions: repetition,
      sets: sets,
      trainingId: trainingId,
      isDone: false,
    };
    if (
      name != "" &&
      repetition != null &&
      repetition != 0 &&
      sets != null &&
      sets != 0
    ) {
      if (newExercise.id) {
        handleEditExercise(newExercise);
        exitFromEditMode();
      } else {
        setName("");
        setRepetition(0);
        setSets(0);
        handleCreateExercise(newExercise);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "Please fill all fields!",
      });
    }
    Keyboard.dismiss();
  };
  const exitFromEditMode = () => {
    setName("");
    setRepetition(0);
    setSets(0);
    handleCloseEditMode();
  };
  const placeholderColor = colorScheme == "dark" ? "white" : "black";
  return (
    <View className=" px-2">
      <TextInput
        className="text-black border border-gray-300 px-4 h-12 bg-gray-50 my-2 rounded-xl dark:bg-zinc-400 dark:border-white dark:border-2 dark:text-white"
        value={name}
        onChangeText={(text) => setName(text)}
        placeholderTextColor={placeholderColor}
        placeholder="Name"
      ></TextInput>
      <View className=" flex-row w-full  justify-center items-center  space-x-2">
        <TextInput
          className="flex-1 text-black px-4 border border-gray-300 h-12   bg-gray-50  rounded-xl dark:bg-zinc-400 dark:border-white dark:border-2 dark:text-white"
          value={repetition ? repetition.toString() : ""}
          onChangeText={(text) => setRepetition(parseInt(text) || 0)}
          placeholderTextColor={placeholderColor}
          placeholder="Repetitions "
          keyboardType="number-pad"
        ></TextInput>
        <Text className="dark:text-white"> X </Text>
        <TextInput
          className="w-2/5 text-black px-4 h-12     border border-gray-300  bg-gray-50 rounded-xl dark:bg-zinc-400 dark:border-white dark:border-2 dark:text-white"
          value={sets ? sets.toString() : ""}
          onChangeText={(text) => setSets(parseInt(text) || 0)}
          placeholderTextColor={placeholderColor}
          placeholder="Set"
          keyboardType="number-pad"
        ></TextInput>
      </View>
      <View className="flex-row justify-end">
        {exerciseToEdit && (
          <Pressable
            className=" bg-red-400 py-2 px-5 mr-2 mt-2 rounded-xl"
            onPress={exitFromEditMode}
          >
            <Text className="text-white text-xl">Cancel</Text>
          </Pressable>
        )}
        <Pressable
          className=" bg-green-400 py-2 px-5 mt-2 rounded-xl dark:bg-green-700"
          onPress={handleCreate}
        >
          <Text className="text-white text-xl">
            {exerciseToEdit ? "Save" : "Add"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
