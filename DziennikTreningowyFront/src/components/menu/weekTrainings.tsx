import { Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  getTraingsInDateRange,
  getTrainingIdInDateRange,
  getTrainingsByDate,
  isTrainingCompleted,
} from "../../database/repositories/trainingRepository";
import { useCallback, useEffect, useState } from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useColorScheme } from "nativewind";
import { useFocusEffect } from "@react-navigation/native";
type weekTraining = {
  date: Date;
  isDone: boolean;
};
export default function WeekTrainings() {
  const [trainingStatus, setTrainingStatus] = useState<weekTraining[]>([]);
  const getCurrentWeekDates = (): Date[] => {
    const today = new Date();
    const currentDay = today.getDay();

    const mondayOffset = currentDay === 0 ? 1 : 1 - currentDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      return day;
    });

    return weekDays;
  };
  const { colorScheme } = useColorScheme();

  const currentWeek = getCurrentWeekDates();
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const statusList: weekTraining[] = [];
        for (const date of currentWeek) {
          const trainings = await getTrainingsByDate(date);
          let isDone: boolean = false;
          if (trainings) {
            let allTrainingsDone: boolean | null = null;
            for (const training of trainings) {
              const isTrainingComplted = await isTrainingCompleted(training.id);
              if (isTrainingComplted && allTrainingsDone != false) {
                allTrainingsDone = true;
              } else {
                allTrainingsDone = false;
              }
            }
            isDone = allTrainingsDone ? true : false;
          }
          statusList.push({
            date: date,
            isDone,
          });
        }
        setTrainingStatus(statusList);
      })();
    }, []) 
  );
  const iconColor = colorScheme == "dark" ? "white" : "gray";
  return (
    <View className="flex-row justify-between bg-white dark:bg-zinc-400">
      {trainingStatus.map((training, index) => {
        return (
          <View key={index} className=" items-center">
            <Text className="text-black font-bold pb-1 dark:text-white">
              {training.date.toLocaleDateString("en-EN", { weekday: "short" })}
            </Text>
            <FontAwesome6
              name="circle-check"
              size={30}
              color={training.isDone ? "green" : iconColor}
            />
          </View>
        );
      })}
    </View>
  );
}
