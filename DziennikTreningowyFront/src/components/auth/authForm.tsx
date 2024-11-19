import { Button, Pressable, Text, TextInput, View } from "react-native";
type Props = {
  isLogin: boolean;
  onSubmit: () => void;
  credentialsInvalid: {
    email: boolean;
    password: boolean;
    confirmEmail: boolean;
    confirmPassword: boolean;
  };
};
export default function AuthForm({
  isLogin,
  onSubmit,
  credentialsInvalid,
}: Props) {
  return (
    <View className="  p-4 mx-2 bg-gray-200">
      <TextInput
        placeholder="Email"
        placeholderTextColor={"black"}
        className={inputStyle}
      ></TextInput>
      {!isLogin && (
        <>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"black"}
            className={inputStyle}
          ></TextInput>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"black"}
            className={inputStyle}
          ></TextInput>
        </>
      )}
      <TextInput
        placeholder="Password"
        placeholderTextColor={"black"}
        className={inputStyle}
      ></TextInput>
      <View className="items-center">
        <Pressable className=" bg-green-400  w-1/2 rounded-xl p-2">
          <Text className="text-center text-white text-3xl">
            {isLogin ? "Log In" : "Sing Up"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
const inputStyle =
  "text-black  text-xl px-4 h-14 bg-gray-100 my-2 rounded text-center";
