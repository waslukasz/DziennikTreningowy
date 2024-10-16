import { Pressable, Text, View } from "react-native";

type Props = {
  showDatePicker: (mode: "from" | "to") => void;
  from: Date | undefined;
  to: Date | undefined;
  isSelected:boolean;
};
export default function DateRangePicker({ showDatePicker, from, to,isSelected }: Props) {
  return (
    <View className={` flex justify-center shadow-2xl  rounded-t-xl mx-2 ${isSelected? " bg-emerald-500 ":"bg-gray-50"}`}>
      <View className="items-center">
        <Text className={`${isSelected? " text-white":""}`}>Choose your date</Text>
      </View>
      <View className=" flex-row">
        <Pressable
          onPress={() => showDatePicker("from")}
          className=" px-5 py-1 items-center"
        >
          <Text className={`${isSelected? " text-white":""}`}>From</Text>
          {from && (
            <Text className={`${isSelected? " text-white":""}`}>
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
          <Text className={`${isSelected? " text-white":""}`}>To</Text>
          {to && (
            <Text className={`${isSelected? " text-white":""}`}>
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
