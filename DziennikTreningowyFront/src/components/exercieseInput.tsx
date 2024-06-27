import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { createExercise } from "../database/repositories/exercisesRepository";
import { useSQLiteContext } from "expo-sqlite";
interface Props {
  trainingId: number;
  handleCreateExercise: (newExervise: Exercise) => void;
}
export default function ExercieseInput({
  trainingId,
  handleCreateExercise,
}: Props) {
  const [name, setName] = useState("");
  const [repetition, setRepetition] = useState<number>();
  const [sets, setSets] = useState<number>();
  const handleCreate = () => {
    const newExercise: Exercise = {
      name: name,
      repetitions: repetition,
      sets: sets,
      trainingId: trainingId,
    };
    if (name != "" && repetition != null&&repetition!=0 && sets != null&&sets!=0) {
      handleCreateExercise(newExercise);
      setName("");
      setRepetition(0);
      setSets(0);
    }
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="px-2">
        <TextInput
          className="text-black px-4 h-12 bg-gray-100 my-2 rounded-xl "
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor="#000000"
          placeholder="Name"
        ></TextInput>
        <View className="flex flex-row items-center  space-x-2">
          <TextInput
            className="text-black px-4 h-12 basis-1/2 bg-gray-100  rounded-xl"
            value={repetition ? repetition.toString() : ""}
            onChangeText={(text) => setRepetition(parseInt(text) || 0)}
            placeholderTextColor="#000000"
            placeholder="Repetitions "
            keyboardType="number-pad"
          ></TextInput>
          <Text className=""> X </Text>
          <TextInput
            className="text-black px-4 h-12 basis-1/3   bg-gray-100 rounded-xl"
            value={sets ? sets.toString() : ""}
            onChangeText={(text) => setSets(parseInt(text) || 0)}
            placeholderTextColor="#000000"
            placeholder="Set"
            keyboardType="number-pad"
          ></TextInput>
        </View>
        <View className=" items-end">
          <Pressable
            className=" bg-green-400 py-2 px-5 mt-2 rounded-xl"
            onPress={handleCreate}
          >
            <Text className="text-white text-xl">Save</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
