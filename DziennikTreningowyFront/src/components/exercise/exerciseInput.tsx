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
  return (
    <View className="px-2">
      <TextInput
        className="text-black px-4 h-12 bg-gray-50 my-2 rounded-xl "
        value={name}
        onChangeText={(text) => setName(text)}
        placeholderTextColor="#000000"
        placeholder="Name"
      ></TextInput>
      <View className="flex flex-row items-center  space-x-2">
        <TextInput
          className="text-black px-4 h-12 basis-1/2 bg-gray-50  rounded-xl"
          value={repetition ? repetition.toString() : ""}
          onChangeText={(text) => setRepetition(parseInt(text) || 0)}
          placeholderTextColor="#000000"
          placeholder="Repetitions "
          keyboardType="number-pad"
        ></TextInput>
        <Text className=""> X </Text>
        <TextInput
          className="text-black px-4 h-12 basis-1/3   bg-gray-50 rounded-xl"
          value={sets ? sets.toString() : ""}
          onChangeText={(text) => setSets(parseInt(text) || 0)}
          placeholderTextColor="#000000"
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
          className=" bg-green-400 py-2 px-5 mt-2 rounded-xl"
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
