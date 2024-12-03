import { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import { useFocusEffect } from "@react-navigation/native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  createTraining,
  deleteTraining,
  getTraingsInDateRange,
} from "../database/repositories/trainingRepository";
import DateRangePicker from "../components/training/dateRangePicker";
import TrainingList from "../components/training/trainingList";
import { TrainingScreenProps } from "../types/navigationStackParms";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
export default function TrainingsScreen({ navigation }: TrainingScreenProps) {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<
    "from" | "to" | "create"
  >("create");
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<Date>();
  const [lastDayOfWeek, setLastDayOfWeek] = useState<Date>();

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

  const setFirstAndLastDays = (offset: number = 0) => {
    const curr = new Date();
    curr.setDate(curr.getDate() + offset * 7);
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
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong!",
      });
    }
  };

  const handleCreateTraining = (date: Date) => {
    const nowDate = new Date();
    date.setHours(
      nowDate.getHours(),
      nowDate.getMinutes(),
      nowDate.getSeconds()
    );
    createTraining(date);
    loadTrainings();
    setIsDatePickerVisible(false);
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Successfully added training!",
    });
  };

  const handleDatePicked = async (date: Date) => {
    if (datePickerMode === "from") {
      if (lastDayOfWeek && date > lastDayOfWeek) {
        setLastDayOfWeek(date);
      }
      const newSelectedWeek = calculateSelectedWeek(date);
      console.log(newSelectedWeek);
      setSelectedWeek(newSelectedWeek);
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
      return await getTraingsInDateRange(firstDayOfWeek, lastDayOfWeek);
  };

  const handleDeleteTraining = async (id: number) => {
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
  const calculateSelectedWeek = (selectedDate: Date) => {
    const today = new Date();
    const todayStartOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
    );
    const selectedStartOfWeek = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() -
        selectedDate.getDay() +
        (selectedDate.getDay() === 0 ? -6 : 1)
    );
    const diffInDays = Math.floor(
      (selectedStartOfWeek.getTime() - todayStartOfWeek.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return Math.floor(diffInDays / 7);
  };
  return (
    <View className="flex-1   ">
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
              className={` w-1/6 p-4 justify-center items-center  rounded-t-xl ml-1 bg-gray-50 border border-gray-300 border-b-0`}
            >
              <FontAwesome6
                name="angle-left"
                size={25}
                // color={}
              />
            </Pressable>

            <DateRangePicker
              showDatePicker={showDatePicker}
              from={firstDayOfWeek}
              to={lastDayOfWeek}
            />
            <Pressable
              onPress={() => handleWeekChange("+")}
              className={`w-1/6 p-4 justify-center items-center  rounded-t-xl mr-1 bg-gray-50 border border-gray-300 border-b-0 `}
            >
              <FontAwesome6
                name="angle-right"
                size={25}
                // color={}
              />
            </Pressable>
          </View>
        </LinearGradient>
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
      <View className="">
        <TrainingList
          trainings={trainings}
          handleDeleteTraining={handleDeleteTraining}
        />
      </View>
    </View>
  );
}
