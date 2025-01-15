import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  View,
  TouchableOpacity as Pressable,
  Text,
  ScrollView,
} from "react-native";
import WeekTrainings from "../components/menu/weekTrainings";
import { useEffect, useState } from "react";
import { getUser } from "../database/repositories/userRepository";
import { getLastTraining } from "../database/repositories/trainingRepository";
import { countExercisesInTraining } from "../database/repositories/exercisesRepository";
import { LinearGradient } from "expo-linear-gradient";
import { BodyMeasurements } from "../types/bodyMeasurementsType";
import { getLastMeasurement } from "../database/repositories/bodyMeasurementRepository";
import { BodyPartEnum } from "../types/bodyPartEnum";
import { useFocusEffect } from "@react-navigation/native";
import { motivationalQuotes } from "../../assets/quotes";
import React from "react";
import { useColorScheme } from "nativewind";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [userName, setUserName] = useState<null | string>(null);
  const [lastTraining, setLastTraining] = useState<null | Training>(null);
  const [lastMeasurement, setLastMeasurement] =
    useState<null | BodyMeasurements>(null);
  const [exercisesCount, setExercisesCount] = useState<null | number>();
  const [quote, setQuote] = useState<Quote>();
  const { colorScheme } = useColorScheme();

  useFocusEffect(() => {
    async function getUserData() {
      let user = await getUser();
      if (user) {
        setUserName(user.firstName);
      }
    }
    async function getTrainingData() {
      let training = await getLastTraining();
      if (training) {
        let exercisesCount = await countExercisesInTraining(training.id);
        setExercisesCount(exercisesCount);
        setLastTraining(training);
      }
    }
    async function getMeasurement() {
      let measurement = await getLastMeasurement();
      if (measurement) {
        setLastMeasurement(measurement);
      }
    }
    getMeasurement();
    getTrainingData();
    getUserData();
  });
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 50);

    setQuote(motivationalQuotes[randomNumber]);
  }, []);

  const gradientColors: [string, string] =
    colorScheme == "dark" ? ["#696969", "#858585"] : ["#128A7F", "#30c96b"];

  return (
    <ScrollView>
      <View className=" flex flex-row flex-wrap justify-around bg-zinc-100 dark:bg-zinc-500 min-h-screen">
        {/* <LinearGradient
          colors={["#11998E", "#30c96b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="text-start w-full mb-6 h-24 pl-3 justify-center"
        > */}

        <View className="text-start w-full  h-24 pl-3 justify-center border-gray-300 border-b">
          <Text className="text-4xl text-black font-thin dark:text-white">
            Hello {userName}
          </Text>
        </View>

        {/* </LinearGradient> */}

        {quote ? (
          <View className="p-12">
            <Text className="text-black text-center italic font-extralight text-lg dark:text-white">
              {quote.quote}
            </Text>
            <Text className="text-black text-right w-full mt-5 dark:text-white">
              {quote.author}
            </Text>
          </View>
        ) : null}

        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className=" w-full h-36 my-1 p-5 justify-center border-y border-white"
        >
          {lastTraining?.timestamp ? (
            <>
              <Text className="text-xl text-white font-bold text-center">
                Your last training was on{" "}
                {new Date(lastTraining!.timestamp).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Text>
              <Text className="text-center text-white text-lg">
                You did {exercisesCount}
                {exercisesCount != 1 ? " exercises" : " exercise"}
              </Text>
              <Pressable
                className="w-full"
                onPress={() => {
                  navigation.navigate("mainApp", {
                    screen: "TrainingStack",
                    params: {
                      screen: "Exercises",
                      params: {
                        trainingId: lastTraining?.id,
                      },
                    },
                  });
                }}
              >
                <Text className="text-center mt-5 text-white">
                  Click here to check!
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text className="text-xl text-white font-bold text-center">
                There is no recent training!
              </Text>
              <Pressable
                className="w-full"
                onPress={() => {
                  navigation.navigate("mainApp", {
                    screen: "TrainingStack",
                  });
                }}
              >
                <Text className="text-center mt-5 text-white">
                  Click here to start your first training!
                </Text>
              </Pressable>
            </>
          )}
        </LinearGradient>

        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full mb-1 px-5 py-12 flex justify-center shadow-sm shadow-black"
        >
          {lastMeasurement ? (
            <>
              <Text className="text-xl text-white font-bold text-center">
                Your most recent measurement:
              </Text>
              <Text className="text-xl text-white text-center">
                {lastMeasurement.bodyPart === BodyPartEnum.bodyWeight
                  ? `Body weight: ${lastMeasurement.value} kg`
                  : `${lastMeasurement.bodyPart}: ${lastMeasurement.value} cm`}
              </Text>
            </>
          ) : (
            <>
              <Text className="text-xl text-white font-bold text-center">
                There is no recent measurement
              </Text>
              <Pressable
                className="w-full"
                onPress={() => {
                  navigation.navigate("mainApp", {
                    screen: "BodyMeasurmentStack",
                  });
                }}
              >
                <Text className="text-center mt-5 text-white">
                  Click here to add your first measurement!
                </Text>
              </Pressable>
            </>
          )}
        </LinearGradient>

        <View className="flex border w-full p-4 mt-5 bg-white rounded-lg border-gray-300 mb-5 dark:bg-zinc-400 ">
          <WeekTrainings />
        </View>
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
