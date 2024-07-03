import { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import {
  createTraining,
  deleteTraining,
  getAllTraingins,
  getTraingsInDateRange,
} from "../../database/repositories/trainingRepository";
import { useSQLiteContext } from "expo-sqlite";
import DateTimePicker from "react-native-modal-datetime-picker";
import TrainingItem from "./trainingItem";
import { useFocusEffect } from "@react-navigation/native";
import PressableButton from "./pressableButton";
import TrainingList from "./trainingList";
import WeekNavigation from "./weekNavigation";
import DateRangePicker from "./dateRangePicker";

export default function TrainingGrid() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<
    "from" | "to" | "create"
  >("create");
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<Date>();
  const [lastDayOfWeek, setLastDayOfWeek] = useState<Date>();
  const db = useSQLiteContext();

  useEffect(() => {
    (async () => {
      if (!firstDayOfWeek && !lastDayOfWeek) {
        await setFirstAndLastDays();
      }
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (firstDayOfWeek && lastDayOfWeek) {
        loadTrainings();
      }
    }, [firstDayOfWeek, lastDayOfWeek])
  );

  const setFirstAndLastDays = (offsetWeeks = 0) => {
    const curr = new Date();
    curr.setDate(curr.getDate() + offsetWeeks * 7);
    const first =
      curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1);
    const last = first + 6;
    const firstday = new Date(curr.setDate(first));
    const lastday = new Date(curr.setDate(last));
    setFirstDayOfWeek(firstday);
    setLastDayOfWeek(lastday);
  };

  const loadTrainings = async () => {
    const data = await getWeekTraings();
    if (data) {
      data.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      setTrainings(data);
    }
  };

  const handleCreateTraining = (date: Date) => {
    const nowDate = new Date();
    date.setHours(
      nowDate.getHours(),
      nowDate.getMinutes(),
      nowDate.getSeconds()
    );
    createTraining(db, date);
    loadTrainings();
    setIsDatePickerVisible(false);
  };

  const handleDatePicked = async (date: Date) => {
    if (datePickerMode === "from") {
      if (lastDayOfWeek && date > lastDayOfWeek) {
        setLastDayOfWeek(date);
      }
      setFirstDayOfWeek(date);
    } else if (datePickerMode === "to") {
      if (firstDayOfWeek && date < firstDayOfWeek) {
        setFirstDayOfWeek(date);
      }
      setLastDayOfWeek(date);
    } else if (datePickerMode === "create") {
      handleCreateTraining(date);
    }
    hideDatePicker();
  };

  const showDatePicker = (mode: "from" | "to" | "create") => {
    setDatePickerMode(mode);
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const getWeekTraings = async () => {
    if (firstDayOfWeek && lastDayOfWeek)
      return await getTraingsInDateRange(db, firstDayOfWeek, lastDayOfWeek);
  };

  const handleDeleteTraining = async (id: number) => {
    await deleteTraining(db, id);
    await loadTrainings();
  };

  const handleWeekChange = (offset: number) => {
    setFirstAndLastDays(offset);
  };

  return (
    <View className="flex-1  ">
      <View className=" m-5 flex-row justify-between">
        <Text className="text-3xl ">Plan List</Text>

        <Pressable
          onPress={() => showDatePicker("create")}
          className="bg-emerald-500 p-3 rounded-xl"
        >
          <Text className="text-4xl text-white">+</Text>
        </Pressable>
      </View>

      <DateTimePicker
        themeVariant="light" // Problem with Calendar Display in Dark Mode (something with react navigation)
        isVisible={isDatePickerVisible}
        mode="date"
        isDarkModeEnabled={false}
        onConfirm={handleDatePicked}
        onCancel={hideDatePicker}
        display="inline"
      />
      <View>
        <ScrollView horizontal>
          <WeekNavigation handleWeekChange={handleWeekChange} />
          <DateRangePicker
            showDatePicker={showDatePicker}
            from={firstDayOfWeek}
            to={lastDayOfWeek}
          />
        </ScrollView>
      </View>
      <View>
        <TrainingList
          trainings={trainings}
          handleDeleteTraining={handleDeleteTraining}
        />
      </View>
    </View>
  );
}
