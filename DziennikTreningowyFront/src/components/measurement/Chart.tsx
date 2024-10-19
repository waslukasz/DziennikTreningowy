import { Text, View } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Dimensions } from "react-native";
import { useState } from "react";

export default function Chart({
  data,
  name,
}: {
  data: chartDataType[];
  name: string;
}) {
  const [selectedPoint, setSelectedPoint] = useState<string>();
  return (
    <View className="p-4">
      <Text className="text-center text-xl">{name}</Text>
      <Text className="text-center text-xl">{selectedPoint}</Text>
      <LineChart
        data={{
          labels: data.map((item) => item.date),
          datasets: [
            {
              data: data.map((item) => item.circumference),
            },
          ],
        }}
        onDataPointClick={({ index }) => {
          let point = data.map((item) => item.circumference)[index].toString();
          setSelectedPoint(`${point} ${name == "Body Weight" ? "kg" : "cm"}`);
        }}
        width={Dimensions.get("window").width - 20}
        height={300}
        yAxisSuffix={name == "Body Weight" ? " kg" : " cm"}
        yAxisInterval={1}
        xLabelsOffset={1}
        fromZero
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "#efeeee",
          decimalPlaces: 2,

          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "white",
          },
          propsForVerticalLabels: {
            fontSize: 10,
            rotation: 30,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
        }}
      />
    </View>
  );
}
