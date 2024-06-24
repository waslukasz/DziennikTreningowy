import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { Text, View } from "react-native";
import { initDatabase } from "./src/database/databaseSettings";


export default function App() {
  return (
    <SQLiteProvider databaseName="testDatabase.db" onInit={initDatabase}>
      <View className="flex-1 items-center justify-center">
        <Text>Dziennik Treningowy!</Text>
      </View>
    </SQLiteProvider>
  );
}
