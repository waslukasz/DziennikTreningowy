import { SQLiteProvider } from "expo-sqlite";
import { databaseName, initDatabase } from "./src/database/databaseSettings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TrainingsScreen from "./src/screens/TrainingsScreen";
import ExercisesScreen from "./src/screens/ExercisesScreen";
import MenuScreen from "./src/screens/MenuScreen";
import BodyMeasurementsScreen from "./src/screens/BodyMeasurementScreen";
import AddMeasurementScreen from "./src/screens/AddMeasurementScreen";
import MeasurementDetailsScreen from "./src/screens/MesasurementDetailsScreen";
import { RootStackParamList } from "./src/types/navigationStackParms";
import Toast from "react-native-toast-message";
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <SQLiteProvider databaseName={databaseName} onInit={initDatabase}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Menu"
            options={{ title: "MENU" }}
            component={MenuScreen}
          />
          <Stack.Screen
            name="Training"
            options={{ title: "" }}
            component={TrainingsScreen}
          />
          <Stack.Screen
            name="BodyMeasurment"
            options={{ title: "" }}
            component={BodyMeasurementsScreen}
          />
          <Stack.Screen name="Exercises" component={ExercisesScreen} />
          <Stack.Screen
            name="AddMeasurement"
            component={AddMeasurementScreen}
          />
          <Stack.Screen
            name="MeasurementDetails"
            component={MeasurementDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </SQLiteProvider>
  );
}
