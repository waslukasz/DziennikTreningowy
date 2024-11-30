import { SQLiteProvider } from "expo-sqlite";
import DropDatabase, {
  databaseName,
  initDatabase,
} from "./src/database/databaseSettings";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import TrainingsScreen from "./src/screens/TrainingsScreen";
import ExercisesScreen from "./src/screens/ExercisesScreen";
import MenuScreen from "./src/screens/MenuScreen";
import BodyMeasurementsScreen from "./src/screens/BodyMeasurementScreen";
import AddMeasurementScreen from "./src/screens/AddMeasurementScreen";
import MeasurementDetailsScreen from "./src/screens/MesasurementDetailsScreen";
import { RootStackParamList } from "./src/types/navigationStackParms";
import Toast from "react-native-toast-message";
import CalculatorsScreen from "./src/screens/CalculatorScreens/CalculatorsScreen";
import BmiCalculatorScreen from "./src/screens/CalculatorScreens/BmiCalculatorScreen";
import OneRepMaxCalculator from "./src/screens/CalculatorScreens/OneRepMaxCalculatorScreen";
import BmrCalculatorScreen from "./src/screens/CalculatorScreens/BmrCalculatorScreen";
import WilksCalculatorScreen from "./src/screens/CalculatorScreens/WilksCalculatorScreen";
import { Button, Pressable, Text } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import HRMaxCalculator from "./src/screens/CalculatorScreens/HRMaxCalculatorScreen";
import VO2Calculator from "./src/screens/CalculatorScreens/VO2MaxCalculatorScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function LoginButton({ navigation }: { navigation: any }) {
  return (
    <Button
      onPress={() => navigation.navigate("Login")}
      title="Login"
      color="#000" // Dostosuj kolor przycisku
    />
  );
}

const MeasurementStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerRight: () => <LoginButton navigation={navigation} />,
      })}
    >
      <Stack.Screen
        name="BodyMeasurment"
        options={{ title: "" }}
        component={BodyMeasurementsScreen}
      />
      <Stack.Screen
        name="AddMeasurement"
        options={{ title: "" }}
        component={AddMeasurementScreen}
      />
      <Stack.Screen
        name="MeasurementDetails"
        options={{ title: "" }}
        component={MeasurementDetailsScreen}
      />
    </Stack.Navigator>
  );
};

const CalculatorStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerRight: () => <LoginButton navigation={navigation} />,
      })}
    >
      <Stack.Screen
        name="Calculators"
        component={CalculatorsScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="BmiCalculator"
        component={BmiCalculatorScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="OneRepMaxCalculator"
        component={OneRepMaxCalculator}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="BmrCalculator"
        component={BmrCalculatorScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="WilksCalculator"
        component={WilksCalculatorScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="HRMax"
        component={HRMaxCalculator}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="VO2Max"
        component={VO2Calculator}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

const TrainingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerRight: () => <LoginButton navigation={navigation} />,
      })}
    >
      <Stack.Screen
        name="Training"
        options={{
          title: "",
        }}
        component={TrainingsScreen}
      />
      <Stack.Screen
        name="Exercises"
        options={{
          title: "",
        }}
        component={ExercisesScreen}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  // const MyTheme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: 'rgb(0, 255, 00)',

  //   },
  // };
  return (
    <SQLiteProvider databaseName={databaseName} onInit={initDatabase}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route, navigation }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string = "";

              if (route.name === "Menu") {
                iconName = "house";
              } else if (route.name === "TrainingStack") {
                iconName = "dumbbell";
              } else if (route.name === "CalculatorsStack") {
                iconName = "calculator";
              } else if (route.name === "BodyMeasurmentStack") {
                iconName = "weight-scale";
              }
              return (
                <FontAwesome6
                  name={iconName}
                  size={24}
                  color={focused ? "tomato" : "gray"}
                />
              );
            },
          })}
        >
          <Tab.Screen
            name="Menu"
            options={({ navigation }) => ({
              headerRightContainerStyle: {
                paddingRight: 16,
              },
              title: "",
              tabBarShowLabel: false,
              headerRight: () => <LoginButton navigation={navigation} />,
            })}
            component={MenuScreen}
          />
          <Tab.Screen
            name="TrainingStack"
            options={{
              tabBarShowLabel: false,
              title: "",
              headerShown: false,
            }}
            component={TrainingStack}
          />
          <Tab.Screen
            name="BodyMeasurmentStack"
            options={{ title: "", tabBarShowLabel: false, headerShown: false }}
            component={MeasurementStack}
          />
          <Tab.Screen
            name="CalculatorsStack"
            options={{ title: "", tabBarShowLabel: false, headerShown: false }}
            component={CalculatorStack}
          />
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{ tabBarButton: () => null }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </SQLiteProvider>
  );
}
