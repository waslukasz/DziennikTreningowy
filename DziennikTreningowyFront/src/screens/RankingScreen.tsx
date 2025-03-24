import { ScrollView, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { getUser } from "../database/repositories/userRepository";
import UserPosition from "../components/ranking/UserPosition";
import { rankingType } from "../types/rankingType";
import api from "../axios/axios";

export default function ({ navigation }: { navigation: any }) {
  const { colorScheme } = useColorScheme();
  const [userId, setUserId] = useState<string>();
  const [rankingData, setRankingData] = useState<rankingType[]>();
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function getLoggedUser() {
      let user = await getUser();
      if (user) {
        setUserId(user.id);
      }
    }
    async function getRankingData() {
      try {
        const response = await api.get("/ranking");
        setIsError(false);
        setRankingData(response.data);
      } catch (error) {
        setIsError(true);
      }
    }
    getRankingData();
    getLoggedUser();
  }, []);
  return (
    <ScrollView>
      <View className="p-5 bg-zinc-100 dark:bg-zinc-500 min-h-screen items-center">
        {rankingData ? (
          rankingData.map((userInfo) => (
            <UserPosition
              key={userInfo.profileId}
              userInfo={userInfo}
              userId={userId!}
            />
          ))
        ) : (
          <Text className="text-black dark:text-white text-lg text-center">
            {isError
              ? "Something went wrong, come back later"
              : "Not enough users to display ranking, come back later"}
            .
          </Text>
        )}

        <View className="bg-white my-10 dark:bg-zinc-400 border-zinc-200 border">
          <View className="px-10 py-5">
            <View className="flex items-center mb-5 flex-row justify-center align-center">
              <AntDesign
                name="infocirlceo"
                size={30}
                color={colorScheme == "dark" ? "white" : "black"}
              />
              <Text className="ml-5 text-black dark:text-white text-lg">
                How to get points?
              </Text>
            </View>
            <Text className="text-justify text-black dark:text-white">
              To get a score, you must train and complete exercises.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
