import { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  createTraining,
  deleteTraining,
  getTraingsInDateRange,
} from "../database/repositories/trainingRepository";
import TrainingList from "../components/training/trainingList";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import ModalDateRangePicker from "../components/training/modalDateRangePicker";
import DateRangePicker from "../components/training/dateRangePicker";
import dayjs from "dayjs";
export default function TrainingsScreen() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<
    "from" | "to" | "create"
  >("create");
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(dayjs());
  const [lastDayOfWeek, setLastDayOfWeek] = useState(dayjs());
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    (async () => {
        await setFirstAndLastDays();
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (firstDayOfWeek && lastDayOfWeek) {
        loadTrainings();
      }
    }, [firstDayOfWeek, lastDayOfWeek])
  );

  const setFirstAndLastDays = (offset: number = 0) => {
    const curr = new Date();
    curr.setDate(curr.getDate() + offset * 7);
    const first =
      curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1);
    const last = first + 6;
    setFirstDayOfWeek(dayjs(new Date(curr.setDate(first))));
    setLastDayOfWeek(dayjs(new Date(curr.setDate(last))));
  };

  const loadTrainings = async () => {
    const data = await getWeekTraings();
    if (data) {
      data.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      await setTrainings(data);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong!",
      });
    }
  };

  const handleCreateTraining = (date: Date) => {
    createTraining(date);
    loadTrainings();
    setIsDatePickerVisible(false);
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Successfully added training!",
    });
  };
  const handleDatePicked = (date: Date) => {
    switch (datePickerMode) {
      case "create": {
        handleCreateTraining(date);
        break;
      }
      case "from": {
        if (lastDayOfWeek && dayjs(date) > lastDayOfWeek) {
          setLastDayOfWeek(dayjs(date));
        }
        const newSelectedWeek = calculateSelectedWeek(date);
        setSelectedWeek(newSelectedWeek);
        setFirstDayOfWeek(dayjs(date));
        break;
      }
      case "to": {
        if (firstDayOfWeek && dayjs(date) < firstDayOfWeek) {
          setFirstDayOfWeek(dayjs(date));
        }
        setLastDayOfWeek(dayjs(date));
        break;
      }
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
      return await getTraingsInDateRange(
        firstDayOfWeek.toDate(),
        lastDayOfWeek.toDate()
      );
  };

  const handleDeleteTraining = async (id: string) => {
    const result = await deleteTraining(id);
    if (result) {
      await loadTrainings();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Successfully deleted training!",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong!",
      });
    }
  };
  const handleWeekChange = (mode: "+" | "-") => {
    let newWeek = selectedWeek;
    if (firstDayOfWeek && lastDayOfWeek) {
      if (mode == "+") {
        newWeek++;
      } else if (mode == "-") {
        newWeek--;
      }
    }
    setSelectedWeek(newWeek);
    setFirstAndLastDays(newWeek);
  };
  const calculateSelectedWeek = (selectedDate: Date): number => {
    const todayStartOfWeek = dayjs().startOf("week").add(1, "day"); 
    const selectedStartOfWeek = dayjs(selectedDate).startOf("week").add(1, "day");
  
    const diffInDays = selectedStartOfWeek.diff(todayStartOfWeek, "day");
    return Math.floor(diffInDays / 7);
  };
  const iconColor = colorScheme == "dark" ? "white" : "#090909";
  return (
    <View className="flex-1 bg-zinc-100 dark:bg-zinc-500">
      <View className=" ">
        <LinearGradient colors={["#1C3113", "#40933A"]}>
          <View className=" mb-5 mx-5 mt-10 flex-row justify-between">
            <Text className="text-3xl text-white">Plan List</Text>

            <Pressable
              onPress={() => showDatePicker("create")}
              className="bg-emerald-500 p-3 border border-green-700 rounded-xl"
            >
              <FontAwesome6 name="add" size={24} color="white" />
            </Pressable>
          </View>

          <View className="flex-row  justify-center w-full">
            <Pressable
              onPress={() => handleWeekChange("-")}
              className={` w-1/6 p-4 justify-center items-center  rounded-t-xl ml-1 bg-gray-50 border border-gray-300 border-b-0 dark:dark:bg-zinc-400 dark:border-0`}
            >
              <FontAwesome6 name="angle-left" size={25} color={iconColor} />
            </Pressable>

            <DateRangePicker
              showDatePicker={showDatePicker}
              from={firstDayOfWeek.toDate()}
              to={lastDayOfWeek.toDate()}
            />
            <Pressable
              onPress={() => handleWeekChange("+")}
              className={`w-1/6 p-4 justify-center items-center  rounded-t-xl mr-1 bg-gray-50 border border-gray-300 border-b-0 dark:dark:bg-zinc-400 dark:border-0`}
            >
              <FontAwesome6 name="angle-right" size={25} color={iconColor} />
            </Pressable>
          </View>
        </LinearGradient>
      </View>
      {isDatePickerVisible && (
        <ModalDateRangePicker
          handleCloseCalendar={hideDatePicker}
          handleSelectDate={handleDatePicked}
          date={
            datePickerMode === "from"
              ? firstDayOfWeek.toDate()
              : datePickerMode === "to"
              ? lastDayOfWeek.toDate()
              : new Date()
          }
        />
      )}
      <View className="">
        <TrainingList
          trainings={trainings}
          handleDeleteTraining={handleDeleteTraining}
        />
      </View>
    </View>
  );
}
