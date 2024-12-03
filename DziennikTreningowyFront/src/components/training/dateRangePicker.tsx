import { Pressable, Text, View } from "react-native";

type Props = {
  showDatePicker: (mode: "from" | "to") => void;
  from: Date | undefined;
  to: Date | undefined;
};
export default function DateRangePicker({
  showDatePicker,
  from,
  to,
}: Props) {
  return (
    <View
      className={` flex-1 py-3 justify-center shadow-2xl mx-1 rounded-t-xl bg-emerald-500
          `}
    >
      <View className=" flex-row  justify-evenly">
        <Pressable
          onPress={() => showDatePicker("from")}
          className=""
        >
          {from && (
            <Text className={`text-lg text-white`}>
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
        <Text className={`text-lg text-white`}>-</Text>
        <Pressable
          onPress={() => showDatePicker("to")}
          className=" "
        >
          {to && (
            <Text className={`text-lg text-white`}>
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
