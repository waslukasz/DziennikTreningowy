import { View } from "react-native";
import CalculatorButton from "../../components/calculator/CalculatorButton";

const CalculatorsScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View className="p-2.5 flex flex-row flex-wrap justify-around bg-zinc-100 dark:bg-zinc-500 h-screen">
      <CalculatorButton
        navigation={navigation}
        text={"BMI"}
        destination={"BmiCalculator"}
      />
      <CalculatorButton
        navigation={navigation}
        text={"1RM"}
        destination={"OneRepMaxCalculator"}
      />
      <CalculatorButton
        navigation={navigation}
        text={"BMR"}
        destination={"BmrCalculator"}
      />
      <CalculatorButton
        navigation={navigation}
        text={"WILKS"}
        destination={"WilksCalculator"}
      />
      <CalculatorButton
        navigation={navigation}
        text={"HRMax"}
        destination={"HRMax"}
      />
      <CalculatorButton
        navigation={navigation}
        text={"VO2"}
        destination={"VO2Max"}
      />
    </View>
  );
};

export default CalculatorsScreen;
