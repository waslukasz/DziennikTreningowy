import { Pressable, Text, View } from "react-native";
import { RowMap } from "react-native-swipe-list-view";

interface Props {
  exercise: Exercise;
  handleEdit: (exercise:Exercise) => void;
  handleDelete: (id?: number) => void;
}
export default function ExerciseHiddenItem({
  exercise,
  handleEdit,
  handleDelete,
}: Props) {
  const handleDeleteExercise = () => {
    handleDelete(exercise.id);
  };
  const handleEditExercise=()=>{
    handleEdit(exercise);
  }
  return (
    <View className="flex-1 m-2 flex-row  items-center justify-end">
      <Pressable
        className="bg-blue-500 flex items-center justify-center w-24  h-full"
        onPress={handleEditExercise}
      >
        <Text className="text-3xl text-white">Edit</Text>
      </Pressable>
      <Pressable
        className="bg-red-500 flex items-center justify-center w-24 rounded-r-xl h-full"
        onPress={handleDeleteExercise}
      >
        <Text className="text-3xl text-white">X</Text>
      </Pressable>
    </View>
  );
}
