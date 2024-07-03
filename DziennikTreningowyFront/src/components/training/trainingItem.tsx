import { Text, Pressable, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { countExercisesInTraining } from "../../database/repositories/exercisesRepository";
import { useNavigation } from "@react-navigation/native";
import { ExerciseScreenProps } from "../../types/navigationStackParms";
interface Props {
  training: Training;
  handleDelete: (id: number) => void;
}
export default function TrainingItem({ training, handleDelete }: Props) {
  const navigation = useNavigation<ExerciseScreenProps>();
  const db = useSQLiteContext();
  const [exercisiesCount, setExercisesCount] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const data = await countExercisesInTraining(db, training.id);
      if (data) {
        setExercisesCount(data);
      } else {
        setExercisesCount(0);
      }
    })();
  }),
    [];
  const trainingDate = new Date(training.timestamp);
  const dateFormat = trainingDate.toLocaleDateString("pl-PL", {
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
      className="bg-gray-50 py-5 px-2 m-4 w-5/12 h-24 rounded-xl"
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
