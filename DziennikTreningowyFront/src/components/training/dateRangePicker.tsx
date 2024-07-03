import { Pressable, Text, View } from "react-native";

type Props = {
  showDatePicker: (mode: "from" | "to") => void;
  from: Date | undefined;
  to: Date | undefined;
};
export default function DateRangePicker({ showDatePicker, from, to }: Props) {
  return (
    <View className=" flex justify-center bg-gray-50 rounded-xl mx-2">
      <View className="items-center">
        <Text>Choose your date</Text>
      </View>
      <View className=" flex-row">
        <Pressable
          onPress={() => showDatePicker("from")}
          className=" px-5 py-1 items-center"
        >
          <Text>From</Text>
          {from && (
            <Text>
              {from.toLocaleDateString("pl-PL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                //hour: "2-digit",
                //  minute: "2-digit",
              })}
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => showDatePicker("to")}
          className=" px-5 py-1 items-center "
        >
          <Text>To</Text>
          {to && (
            <Text>
              {to.toLocaleDateString("pl-PL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                //hour: "2-digit",
                //  minute: "2-digit",
              })}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
