import { Text, Pressable, Alert } from "react-native";
import { useEffect, useState } from "react";
import { countExercisesInTraining } from "../../database/repositories/exercisesRepository";
import {
  ExerciseScreenNavigateProp,
  ExerciseScreenProps,
  TrainingScreenProps,
} from "../../types/navigationStackParms";
import { useNavigation } from "@react-navigation/native";
interface Props {
  training: Training;
  handleDelete: (id: number) => void;
}
export default function TrainingItem({ training, handleDelete }: Props) {
  const navigation = useNavigation<ExerciseScreenNavigateProp>();
  const [exercisiesCount, setExercisesCount] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const data = await countExercisesInTraining(training.id);
      if (data) {
        setExercisesCount(data);
      } else {
        setExercisesCount(0);
      }
    })();
  }),
    [];
  const trainingDate = new Date(training.timestamp);
  const dateFormat = trainingDate.toLocaleDateString("en-En", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    // hour: "2-digit",
    // minute: "2-digit",
  });
  const handleDeleteTraining = () => {
    handleDelete(training.id);
  };
  return (
    <Pressable
      className="bg-gray-50 py-5 shadow px-2 my-3 mx-1 w-5/12 h-24 rounded-xl "
      onLongPress={() =>
        Alert.alert(
          "",
          "Are you sure you want to delete?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            { text: "Yes", onPress: handleDeleteTraining },
          ],
          { cancelable: false }
        )
      }
      delayLongPress={500}
      onPress={() =>
        navigation.navigate("Exercises", { trainingId: training.id })
      }
    >
      <Text className=" text-xl">{dateFormat}</Text>
      {exercisiesCount > 0 && (
        <Text className="text-sm ">{exercisiesCount} exercises</Text>
      )}
    </Pressable>
  );
}
