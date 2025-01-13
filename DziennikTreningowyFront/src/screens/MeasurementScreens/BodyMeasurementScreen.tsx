import { Pressable, ScrollView, Text, View } from "react-native";
import Chart from "../../components/measurement/Chart";
import { getAllBodyMeasurements } from "../../database/repositories/bodyMeasurementRepository";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BodyMeasurements } from "../../types/bodyMeasurementsType";
import { BodyPartEnum } from "../../types/bodyPartEnum";
import React from "react";

const BodyMeasurementScreen = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<BodyMeasurements[] | null>(null);
  const [neckData, setNeckData] = useState<BodyMeasurements[] | null>(null);
  const [bellyData, setBellyData] = useState<BodyMeasurements[] | null>(null);
  const [chestData, setChestData] = useState<BodyMeasurements[] | null>(null);
  const [hipsData, setHipsData] = useState<BodyMeasurements[] | null>(null);
  const [bicepData, setBicepData] = useState<BodyMeasurements[] | null>(null);
  const [thighData, setThighData] = useState<BodyMeasurements[] | null>(null);
  const [waistData, setWaistData] = useState<BodyMeasurements[] | null>(null);
  const [calfData, setCalfData] = useState<BodyMeasurements[] | null>(null);
  const [bodyWeightData, setBodyWeightData] = useState<
    BodyMeasurements[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    try {
      const result = await getAllBodyMeasurements();
      setData(result);
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
    setBellyData(
      data!.filter((d) => d.bodyPart === BodyPartEnum.belly).slice(-10)
    );
    setChestData(
      data!.filter((d) => d.bodyPart === BodyPartEnum.chest).slice(-10)
    );
    setHipsData(
      data!.filter((d) => d.bodyPart === BodyPartEnum.hips).slice(-10)
    );
    setBicepData(
      data!.filter((d) => d.bodyPart === BodyPartEnum.bicep).slice(-10)
    );
    setThighData(
      data!.filter((d) => d.bodyPart === BodyPartEnum.thigh).slice(-10)
    );
    setWaistData(
      data!.filter((d) => d.bodyPart === BodyPartEnum.waist).slice(-10)
    );
    setCalfData(
      data!.filter((d) => d.bodyPart === BodyPartEnum.calf).slice(-10)
    );
    setBodyWeightData(
      data!.filter((d) => d.bodyPart === BodyPartEnum.bodyWeight).slice(-10)
    );
  };
  return (
    <ScrollView className="flex">
      {data ? (
        <>
          {bodyWeightData ? (
            <Chart
              data={bodyWeightData}
              name="Body Weight"
              navigation={navigation}
            />
          ) : null}
          {neckData ? (
            <Chart data={neckData} name="Neck" navigation={navigation} />
          ) : null}
          {bellyData ? (
            <Chart data={bellyData} name="Belly" navigation={navigation} />
          ) : null}
          {chestData ? (
            <Chart data={chestData} name="Chest" navigation={navigation} />
          ) : null}
          {hipsData ? (
            <Chart data={hipsData} name="Hips" navigation={navigation} />
          ) : null}
          {bicepData ? (
            <Chart data={bicepData} name="Bicep" navigation={navigation} />
          ) : null}
          {thighData ? (
            <Chart data={thighData} name="Thigh" navigation={navigation} />
          ) : null}
          {waistData ? (
            <Chart data={waistData} name="Waist" navigation={navigation} />
          ) : null}
          {calfData ? (
            <Chart data={calfData} name="Calf" navigation={navigation} />
          ) : null}
        </>
      ) : (
        <Text>Loading data...</Text>
      )}
    </ScrollView>
  );
};

export default BodyMeasurementScreen;
