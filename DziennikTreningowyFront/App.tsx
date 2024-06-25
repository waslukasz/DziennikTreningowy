import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { Text, View } from "react-native";
import { initDatabase } from "./src/database/databaseSettings";
import TrainingGrid from "./src/components/trainingGrid";

export default function App() {
  return (
    <SQLiteProvider databaseName="testDatabase.db" onInit={initDatabase}>
        <TrainingGrid></TrainingGrid>
    </SQLiteProvider>
  );
}
