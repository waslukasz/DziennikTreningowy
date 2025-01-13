import { Pressable, Text, View } from "react-native";
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
import { BodyMeasurements } from "../../types/bodyMeasurementsType";
import { BodyPartEnum } from "../../types/bodyPartEnum";

export default function Chart({
  data,
  name,
  navigation,
}: {
  data: BodyMeasurements[];
  name: string;
  navigation: any;
}) {
  const [selectedPoint, setSelectedPoint] = useState<string>();

  return (
    <View className="p-4 flex items-center bg-white border-b border-gray-200 mb-5">
      <View className="flex-row items-center flex w-full justify-center">
        <Pressable
          onPress={() => {
            if (data.length == 0) {
              let part =
                name === "Body Weight" ? "bodyWeight" : name.toLowerCase();
              navigation.navigate("AddMeasurement", {
                measurementPart:
                  BodyPartEnum[part as keyof typeof BodyPartEnum],
              });
            } else {
              navigation.navigate("MeasurementDetails", {
                data: data.reverse(),
                title: name,
              });
            }
          }}
        >
          <Text className="text-center text-3xl">{name}</Text>
        </Pressable>
        <View className="w-1/6 justify-center items-center">
          <Pressable
            onPress={() => {
              let part =
                name === "Body Weight" ? "bodyWeight" : name.toLowerCase();
              navigation.navigate("AddMeasurement", {
                measurementPart:
                  BodyPartEnum[part as keyof typeof BodyPartEnum],
              });
            }}
            className="bg-emerald-500 rounded-md w-8 h-8 flex justify-center"
          >
            <Text className=" text-2xl text-white text-center">+</Text>
          </Pressable>
        </View>
      </View>
      {data.length > 0 ? (
        <LineChart
          data={{
            labels: data.map((item) =>
              new Date(item.date!).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            ),
            datasets: [
              {
                data: data.map((item) => item.value),
              },
            ],
          }}
          onDataPointClick={({ index }) => {
            let point = data.map((item) => item.value)[index].toString();
            setSelectedPoint(`${point} ${name == "Body Weight" ? "kg" : "cm"}`);
          }}
          width={Dimensions.get("window").width}
          height={300}
          yAxisSuffix={name == "Body Weight" ? " kg" : " cm"}
          yLabelsOffset={5}
          yAxisInterval={1}
          xLabelsOffset={4}
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
            marginLeft: 0,
            padding: 0,
          }}
        />
      ) : null}
      {selectedPoint ? (
        <View className="bg-white p-1 w-24 rounded-md shadow-sm shadow-black">
          <Text className="text-center text-xl ">{selectedPoint}</Text>
        </View>
      ) : null}
    </View>
  );
}
