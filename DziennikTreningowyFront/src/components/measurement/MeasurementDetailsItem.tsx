import { Text, View } from "react-native";
import { BodyMeasurements } from "../../types/bodyMeasurementsType";
import React from "react";

export default function MeasurementDetailsItem({
  item,
  unit,
  index,
  diff,
  lastItemIndex,
}: {
  item: BodyMeasurements;
  unit: string;
  index: number;
  diff: number;
  lastItemIndex: number;
}) {
  return (
    <>
      <View
        className="bg-white dark:bg-zinc-400 mb-5 p-3 rounded-md shadow-sm shadow-black flex justify-around flex-row h-20 items-center"
        key={item.id}
      >
        <Text className="dark:text-white w-1/3">
          {new Date(item.date!).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>
        <Text className="text-xl dark:text-white w-1/3 text-center">
          {item.value} {unit}
        </Text>
        {index != lastItemIndex - 1 ? (
          <Text className="dark:text-white w-1/3 text-right">{`${
            diff > 0 ? "+" : ""
          }${diff} ${unit}`}</Text>
        ) : null}
      </View>
    </>
  );
}
