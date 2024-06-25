import { useEffect, useState } from "react";
import { View, Text, Pressable, Button, FlatList } from "react-native";
import {
  createTraining,
  getAllTraingins,
} from "../database/repositories/trainingRepository";
import { useSQLiteContext } from "expo-sqlite";
import DateTimePicker from "react-native-modal-datetime-picker";
import TrainingItem from "./trainingItem";

export default function TrainingGrid() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const db = useSQLiteContext();

  useEffect(() => {
    (async () => {
      const data = await getAllTraingins(db);
      setTrainings(data);
    })();
  }, [isDatePickerVisible]);
  const handleCreateTraining = (date: Date) => {
    createTraining(db, date);
    setIsDatePickerVisible(false);
  };
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
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
        onCancel={() => setIsDatePickerVisible(false)}
      />
      <View>
        <FlatList
          numColumns={2}
          data={trainings}
          className="flex-grow-0 h-5/6"
          columnWrapperStyle={{justifyContent:'center'}}
          renderItem={({ item }) => (
              <TrainingItem training={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}
