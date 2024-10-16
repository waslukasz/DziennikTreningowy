import { Alert, Pressable, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface Props {
  exercise: Exercise;
  handleEdit: (exercise: Exercise) => void;
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
  const handleEditExercise = () => {
    handleEdit(exercise);
  };
  return (
    <View className=" flex-1 flex-row my-2 items-center justify-end">
      <Pressable
        className="bg-blue-500 flex items-center h-full justify-center w-24 "
        onPress={handleEditExercise}
      >
        <FontAwesome6 name="edit" size={24} color="white" />
        </Pressable>
      <Pressable
        className="bg-red-500 flex items-center h-full  justify-center w-24 rounded-r-xl "
        onPress={() =>
          Alert.alert(
            "",
            "Are you sure you want to delete?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              { text: "Yes", onPress: handleDeleteExercise },
            ],
            { cancelable: false }
          )
        }
      >
        <FontAwesome6 name="trash" size={24} color="white" />
      </Pressable>
    </View>
  );
}
