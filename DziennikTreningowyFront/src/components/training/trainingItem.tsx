import { Text, Pressable, Alert, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { countExercisesInTraining } from "../../database/repositories/exercisesRepository";
import { ExerciseScreenNavigateProp } from "../../types/navigationStackParms";
import { useNavigation } from "@react-navigation/native";
import { isTrainingCompleted } from "../../database/repositories/trainingRepository";
import { useColorScheme } from "nativewind";
interface Props {
  training: Training;
  handleDelete: (id: number) => void;
}
export default function TrainingItem({ training, handleDelete }: Props) {
  const navigation = useNavigation<ExerciseScreenNavigateProp>();
  const [exercisiesCount, setExercisesCount] = useState<number>(0);
  const [isTrainingDone, setIsTrainingDone] = useState<boolean>(false);
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    (async () => {
      const data = await countExercisesInTraining(training.id);
      setIsTrainingDone(await isTrainingCompleted(training.id));
      if (data) {
        setExercisesCount(data);
      } else {
        setExercisesCount(0);
      }
    })();
  }),
    [];
  const trainingDate = new Date(training.timestamp);
  const dateFormat = trainingDate
    .toLocaleDateString("us-US", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      // hour: "2-digit",
      // minute: "2-digit",
    })
    .replace(" ", "\n");
  const handleDeleteTraining = () => {
    handleDelete(training.id);
  };
  const styles = StyleSheet.create({
    button: {
      backgroundColor: colorScheme == "dark" ? "#a1a1aa" : "#f9fafb",
      justifyContent: "center",
      padding: 10,
      borderWidth: 2,
      borderColor: "#d1d5db",
      shadowOpacity: 0.2,
      shadowOffset: { width: 3, height: -3 },
      marginVertical: 12,
      marginHorizontal: 4,
      width: "45%",
      height: 96,
      borderRadius: 16,
    },
    completedButton: {
      borderColor: "#10b981",
    },
    inProgressButton: {
      borderColor: "#d1d5db",
    },
  });
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.3 : 1,
        },
        styles.button,
        isTrainingDone ? styles.completedButton : styles.inProgressButton,
      ]}
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
      <Text className="text-center text-lg dark:text-white">{dateFormat}</Text>
      {exercisiesCount > 0 && (
        <Text className="text-center dark:text-white">
          {exercisiesCount} exercises
        </Text>
      )}
    </Pressable>
  );
}
