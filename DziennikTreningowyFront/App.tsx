import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { initDatabase } from "./src/database/databaseSettings";
import TrainingGrid from "./src/components/trainingGrid";
import ExercisesList from "./src/components/exercisesList";

export default function App() {
  return (
    <SQLiteProvider databaseName="testDatabase1.2.db"  onInit={initDatabase}>
        {/* <TrainingGrid></TrainingGrid> */}
        <ExercisesList trainingId={2} ></ExercisesList>
    </SQLiteProvider>
  );
}
