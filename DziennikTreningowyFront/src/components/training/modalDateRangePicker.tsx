import { Modal, Pressable, Text, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "nativewind";
type Props = {
  date?: DateType;
  handleCloseCalendar: () => void;
  handleSelectDate: (parms: any) => void;
};
export default function ModalDateRangePicker({
  handleCloseCalendar,
  handleSelectDate,
  date,
}: Props) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme == "dark" ? "white" : "#090909";
  const calendarTextColor = colorScheme == "dark" ? "white" : "black";
  const buttonBackground = colorScheme == "dark" ? "#A1A1AA" : "#white";
  return (
    <Modal transparent={true}>
      <View className="flex-1 justify-center items-center bg-modal-black-rgba  ">
        <View className="bg-zinc-100 opacity-100 m-1 rounded-xl dark:bg-zinc-500 dark:border-0">
          <Pressable
            className="items-end py-2 px-1 "
            onPress={handleCloseCalendar}
          >
            <AntDesign name="closecircleo" size={44} color={iconColor} />
          </Pressable>
          <View className="px-3">
            <DateTimePicker
              onChange={(parms) => {
                handleSelectDate(parms.date)
              }}
              date={date}
              mode="single"
              firstDayOfWeek={1}
              headerButtonColor={calendarTextColor}
              selectedItemColor="#10b981"
              calendarTextStyle={{ color: calendarTextColor }}
              headerTextStyle={{ color: calendarTextColor }}
              weekDaysTextStyle={{ color: calendarTextColor }}
              monthContainerStyle={{
                backgroundColor: buttonBackground,
              }}
              yearContainerStyle={{
                backgroundColor: buttonBackground,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
