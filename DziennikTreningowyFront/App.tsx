import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { initDatabase } from "./src/database/databaseSettings";
import { NavigationContainer,DefaultTheme, DarkTheme  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TrainingsScreen from "./src/screens/TrainingsScreen";
import ExercisesScreen from "./src/screens/ExercisesScreen";
import { RootStackParamList } from "./src/types/navigationStackParms";
import DateTimePicker from "react-native-modal-datetime-picker";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };
  const scheme = useColorScheme();
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
