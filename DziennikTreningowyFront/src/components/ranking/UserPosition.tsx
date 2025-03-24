import { View, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { rankingType } from "../../types/rankingType";

export default function UserPosition({
  userInfo,
  userId,
}: {
  userInfo: rankingType;
  userId: string;
}) {
  let crownColor = "#cd7f32";
  if (userInfo.position === 1) {
    crownColor = "#C9B037";
  } else if (userInfo.position === 2) {
    crownColor = "#D7D7D7";
  }

  let isSelected = userInfo.profileId === userId ? true : false;
  let tileStyle = `${
    isSelected ? "bg-[#ffe5e3] border-red-900" : "bg-white border-zinc-200"
  } w-full p-3 flex-row justify-around items-center mb-1 border rounded-md h-20`;
  let userName = userInfo.email.split("@")[0];
  return (
    <View className={tileStyle}>
      <View className="w-1/3">
        {userInfo.position < 4 ? (
          <FontAwesome5 name="crown" size={30} color={crownColor} />
        ) : (
          <Text className="w-1/3 text-center">#{userInfo.position}</Text>
        )}
      </View>
      <Text className="w-1/3 text-center">{userName}</Text>
      <Text className="w-1/3 text-center">points: {userInfo.score}</Text>
    </View>
  );
}
