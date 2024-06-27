import { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import {
  createTraining,
  getTraingsInDateRange,
} from "../database/repositories/trainingRepository";
import { useSQLiteContext } from "expo-sqlite";
import DateTimePicker from "react-native-modal-datetime-picker";
import TrainingItem from "./trainingItem";
import { getAllExercises } from "../database/repositories/exercisesRepository";

export default function TrainingGrid() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const db = useSQLiteContext();
  useEffect(() => {
    (async () => {
      const data = await getWeekTraings();
      data.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      setTrainings(data);
    })();
  }, [isDatePickerVisible]);
  const handleCreateTraining = (date: Date) => {
    const nowDate = new Date();
    date.setHours(
      nowDate.getHours(),
      nowDate.getMinutes(),
      nowDate.getSeconds()
    );
    createTraining(db, date);
    setIsDatePickerVisible(false);
  };
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const getWeekTraings = async () => {
    const curr = new Date();
    const first =
      curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1);
    const last = first + 6;
    const firstday = new Date(curr.setDate(first));
    firstday.setHours(0, 0, 0, 0);
    const lastday = new Date(curr.setDate(last));
    lastday.setHours(23, 59, 59, 59);
    return await getTraingsInDateRange(db, firstday, lastday);
  };
  return (
    <View className="flex-1  ">
      <View className=" mx-5 mt-20 flex-row justify-between">
        <Text className="text-3xl ">Plan List</Text>
        <Pressable
          onPress={showDatePicker}
          className="bg-emerald-500 p-3 rounded-xl"
        >
          <Text className="text-4xl text-white">+</Text>
        </Pressable>
      </View>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleCreateTraining}
        onCancel={hideDatePicker}
        display="inline"
      />
      <View>
        <FlatList
          numColumns={2}
          data={trainings}
          className="flex-grow-0 mt-5 h-5/6"
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => <TrainingItem training={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}
