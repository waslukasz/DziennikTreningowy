import { SQLiteProvider} from "expo-sqlite";
import { initDatabase } from "./src/database/databaseSettings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TrainingsScreen from "./src/screens/TrainingsScreen";
import ExercisesScreen from "./src/screens/ExercisesScreen";
import { RootStackParamList } from "./src/types/navigationStackParms";
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
 
  return ( 
    <SQLiteProvider databaseName="testDatabase1.2.db" onInit={initDatabase}>
      <NavigationContainer  >
        <Stack.Navigator  >
          <Stack.Screen name='Training' options={{title:""}} component={TrainingsScreen} />
          <Stack.Screen name="Exercises" component={ExercisesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
