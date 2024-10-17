import { Pressable, ScrollView, Text, View } from "react-native";
import Chart from "../components/measurement/Chart";
import { useSQLiteContext } from "expo-sqlite";
import { getAllBodyMeasurements } from "../database/repositories/bodyMeasurementRepository";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

const BodyMeasurementScreen = ({ navigation }: { navigation: any }) => {
  const db = useSQLiteContext();
  const [data, setData] = useState<BodyMeasurements[] | null>(null);
  const [neckData, setNeckData] = useState<chartDataType[] | null>(null);
  const [bellyData, setBellyData] = useState<chartDataType[] | null>(null);
  const [chestData, setChestData] = useState<chartDataType[] | null>(null);
  const [hipsData, setHipsData] = useState<chartDataType[] | null>(null);
  const [bicepData, setBicepData] = useState<chartDataType[] | null>(null);
  const [thighData, setThighData] = useState<chartDataType[] | null>(null);
  const [waistData, setWaistData] = useState<chartDataType[] | null>(null);
  const [calfData, setCalfData] = useState<chartDataType[] | null>(null);
  const [bodyWeightData, setBodyWeightData] = useState<chartDataType[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const result = await getAllBodyMeasurements(db);
      setData(result.reverse());
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (data) {
      convertData();
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const convertData = () => {
    const convertNeckData = () => {
      const temp = data!.map((d) => ({
        date: new Date(d.measurementDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        circumference: d.neck,
      }));
      setNeckData(temp);
    };

    const convertBellyData = () => {
      const temp = data!.map((d) => ({
        date: new Date(d.measurementDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        circumference: d.belly,
      }));
      setBellyData(temp);
    };

    const convertChestData = () => {
      const temp = data!.map((d) => ({
        date: new Date(d.measurementDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        circumference: d.chest,
      }));
      setChestData(temp);
    };

    const convertHipsData = () => {
      const temp = data!.map((d) => ({
        date: new Date(d.measurementDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        circumference: d.hips,
      }));
      setHipsData(temp);
    };

    const convertBicepData = () => {
      const temp = data!.map((d) => ({
        date: new Date(d.measurementDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        circumference: d.bicep,
      }));
      setBicepData(temp);
    };

    const convertThighData = () => {
      const temp = data!.map((d) => ({
        date: new Date(d.measurementDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        circumference: d.thigh,
      }));
      setThighData(temp);
    };

    const convertWaistData = () => {
      const temp = data!.map((d) => ({
        date: new Date(d.measurementDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        circumference: d.waist,
      }));
      setWaistData(temp);
    };

    const convertCalfData = () => {
      const temp = data!.map((d) => ({
        date: new Date(d.measurementDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        circumference: d.calf,
      }));
      setCalfData(temp);
    };

    const convertBodyWeightData = () => {
      const temp = data!.map((d) => ({
        date: new Date(d.measurementDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        circumference: d.bodyWeight,
      }));
      setBodyWeightData(temp);
    };
    convertBodyWeightData();
    convertBellyData();
    convertBicepData();
    convertCalfData();
    convertChestData();
    convertHipsData();
    convertWaistData();
    convertThighData();
    convertNeckData();
  };
  return (
    <ScrollView className="flex">
      <View className=" m-5 flex-row justify-between items-center">
        <Text className="text-2xl ">Add measurement</Text>

        <Pressable
          onPress={() => navigation.navigate("AddMeasurement")}
          className="bg-emerald-500 p-3 rounded-xl w-14 h-14 flex justify-center"
        >
          <Text className="text-3xl text-white text-center">+</Text>
        </Pressable>
      </View>
      {neckData ? <Chart data={neckData} name="Neck" /> : null}
      {bellyData ? <Chart data={bellyData} name="Belly" /> : null}
      {chestData ? <Chart data={chestData} name="Chest" /> : null}
      {hipsData ? <Chart data={hipsData} name="Hips" /> : null}
      {bicepData ? <Chart data={bicepData} name="Bicep" /> : null}
      {thighData ? <Chart data={thighData} name="Thigh" /> : null}
      {waistData ? <Chart data={waistData} name="Waist" /> : null}
      {calfData ? <Chart data={calfData} name="Calf" /> : null}
      {bodyWeightData ? (
        <Chart data={bodyWeightData} name="Body Weight" />
      ) : (
        <Text>Loading data...</Text>
      )}
    </ScrollView>
  );
};

export default BodyMeasurementScreen;
