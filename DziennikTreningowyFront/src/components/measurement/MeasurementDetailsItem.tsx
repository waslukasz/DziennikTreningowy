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
        className="bg-white mb-5 p-3 rounded-md shadow-sm shadow-black flex justify-around flex-row h-20 items-center"
        key={item.id}
      >
        <Text>
          {new Date(item.date!).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>
        <Text className="text-xl">
          {item.value} {unit}
        </Text>
        {index != lastItemIndex - 1 ? (
          <Text>{`${diff > 0 ? "+" : ""}${diff} ${unit}`}</Text>
        ) : null}
      </View>
    </>
  );
}
