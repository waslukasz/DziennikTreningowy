import { ActivityIndicator, Text, View } from "react-native";
type Props={
    message?:string
}
export default function LoadingOverlay({message}:Props) {
    return (
      <View className="flex-1 justify-center" >
        <Text className="text-center mb-5 text-lg" >{message}</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }