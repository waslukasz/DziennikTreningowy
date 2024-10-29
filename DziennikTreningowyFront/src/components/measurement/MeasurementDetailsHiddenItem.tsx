import { Pressable, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BodyMeasurements } from "../../types/bodyMeasurementsType";
import { useState } from "react";

export default function MeasurementDetailsHiddenItem({
  item,
  deleteMeasurement,
  editMeasurement,
}: {
  item: BodyMeasurements;
  deleteMeasurement: (id: number) => void;
  editMeasurement: (item: BodyMeasurements) => void;
}) {
  const deleteHandler = () => {
    deleteMeasurement(item.id!);
  };
  const handleEditExercise = () => {
    editMeasurement(item);
  };
  return (
    <>
      <View className=" flex flex-row items-center justify-end h-20">
        <Pressable
          className="bg-blue-500 flex items-center  justify-center w-24 h-20 "
          onPress={handleEditExercise}
        >
          <FontAwesome6 name="edit" size={24} color="white" />
        </Pressable>
        <Pressable
          className="bg-red-500 flex items-center h-20  justify-center w-24 rounded-r-xl "
          onPress={deleteHandler}
        >
          <FontAwesome6 name="trash" size={24} color="white" />
        </Pressable>
      </View>
    </>
  );
}
