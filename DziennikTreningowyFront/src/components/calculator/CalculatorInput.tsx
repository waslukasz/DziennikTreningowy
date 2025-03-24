import { useColorScheme } from "nativewind";
import { TextInput } from "react-native";

export default function CalculatorInput({
  value,
  setValue,
  placeholderText,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholderText: string;
}) {
  const { colorScheme } = useColorScheme();
  const inputStyle =
    "text-black px-4 h-12 bg-white my-2 border border-zinc-300 w-72 rounded-xl text-center dark:bg-zinc-400 dark:border-white dark:border-2 dark:text-white";
  return (
    <TextInput
      className={inputStyle}
      value={value}
      onChangeText={(text) => {
        if (!isNaN(+text)) {
          setValue(text);
        }
      }}
      placeholderTextColor={colorScheme == "dark" ? "#cecccc" : "gray"}
      placeholder={placeholderText}
      keyboardType="number-pad"
    />
  );
}
