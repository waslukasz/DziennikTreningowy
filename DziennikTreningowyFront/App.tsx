import { SQLiteProvider } from "expo-sqlite";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TrainingsScreen from "./src/screens/TrainingsScreen";
import ExercisesScreen from "./src/screens/ExercisesScreen";
import BodyMeasurementsScreen from "./src/screens/MeasurementScreens/BodyMeasurementScreen";
import AddMeasurementScreen from "./src/screens/MeasurementScreens/AddMeasurementScreen";
import MeasurementDetailsScreen from "./src/screens/MeasurementScreens/MesasurementDetailsScreen";
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
import FirstLaunchScreen from "./src/screens/FirstLaunchScreen";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./src/screens/HomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import {
  databaseName,
  deleteAllData,
  DropDatabase,
  initDatabase,
} from "./src/database/databaseSettings";
import AuthContextProvider, {
  AuthContext,
} from "./src/components/auth/authContext";
import SettingsScreen from "./src/screens/SettingsScreen";
import { useColorScheme } from "nativewind";
import ProfileScreen from "./src/screens/ProfileScreen";
import UserGuideScreen from "./src/screens/UserGuideScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export default function App() {
  const { colorScheme } = useColorScheme();
  const MeasurementStack = () => {
    let fontColor,
      tintColor = colorScheme == "dark" ? "white" : "black";
    let headerBgColor = colorScheme == "dark" ? "#52525b" : "white";
    return (
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          //  headerRight: () => <LoginButton navigation={navigation} />,
          headerStyle: {
            backgroundColor: headerBgColor,
          },
          headerTitleStyle: {
            color: fontColor,
          },
          headerTintColor: tintColor,
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
    let fontColor,
      tintColor = colorScheme == "dark" ? "white" : "black";
    let headerBgColor = colorScheme == "dark" ? "#52525b" : "white";
    return (
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          //  headerRight: () => <LoginButton navigation={navigation} />,
          headerStyle: {
            backgroundColor: headerBgColor,
          },
          headerTitleStyle: {
            color: fontColor,
          },
          headerTintColor: tintColor,
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
    let fontColor,
      tintColor = colorScheme == "dark" ? "white" : "black";
    let headerBgColor = colorScheme == "dark" ? "#52525b" : "white";
    return (
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          // headerRight: () => <LoginButton navigation={navigation} />,
          headerStyle: {
            backgroundColor: headerBgColor,
          },
          headerTitleStyle: {
            color: fontColor,
          },
          headerTintColor: tintColor,
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
  const ProfileStack = () => {
    let fontColor,
      tintColor = colorScheme == "dark" ? "white" : "black";
    let headerBgColor = colorScheme == "dark" ? "#52525b" : "white";
    return (
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          //    headerRight: () => <LoginButton navigation={navigation} />,
          headerStyle: {
            backgroundColor: headerBgColor,
          },
          headerTitleStyle: {
            color: fontColor,
          },
          headerTintColor: tintColor,
        })}
      >
        <Stack.Screen
          name="Profile"
          options={{ title: "" }}
          component={ProfileScreen}
        />
      </Stack.Navigator>
    );
  };

  const SettingsStack = () => {
    let fontColor,
      tintColor = colorScheme == "dark" ? "white" : "black";
    let headerBgColor = colorScheme == "dark" ? "#52525b" : "white";
    return (
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          // headerRight: () => <LoginButton navigation={navigation} />,
          headerStyle: {
            backgroundColor: headerBgColor,
          },
          headerTitleStyle: {
            color: fontColor,
          },
          headerTintColor: tintColor,
        })}
      >
        <Stack.Screen
          name="Settings"
          options={{ title: "" }}
          component={SettingsScreen}
        />
      </Stack.Navigator>
    );
  };

  const TabNavigator = () => {
    let bgColor = colorScheme == "dark" ? "#52525b" : "white";
    let fontColor = colorScheme == "dark" ? "white" : "black";
    let iconColor = colorScheme == "dark" ? "white" : "black";
    const authCtx = useContext(AuthContext);
    useEffect(() => {
      (async () => {
        const storedToken = await AsyncStorage.getItem("token");
        const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
        if (storedToken && storedRefreshToken) {
          authCtx.authenticate(storedToken, storedRefreshToken);
        }
      })();
    }, []);
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route, navigation }) => ({
          tabBarStyle: {
            backgroundColor: bgColor,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";

            if (route.name === "Home") {
              iconName = "house";
            } else if (route.name === "TrainingStack") {
              iconName = "dumbbell";
            } else if (route.name === "CalculatorsStack") {
              iconName = "calculator";
            } else if (route.name === "BodyMeasurmentStack") {
              iconName = "weight-scale";
            } else if (route.name === "ProfileStack") {
              iconName = "user";
            } else if (route.name === "SettingsStack") {
              iconName = "gear";
            }
            return (
              <FontAwesome6
                name={iconName}
                size={24}
                color={focused ? "tomato" : iconColor}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={({ navigation }) => ({
            headerRightContainerStyle: {
              paddingRight: 16,
            },
            title: "",
            tabBarShowLabel: false,
            headerStyle: {
              backgroundColor: bgColor,
              borderBottomColor: "#a1a1a1",
              borderBottomWidth: 1,
            },
            // headerRight: () => <LoginButton navigation={navigation} />,
          })}
          component={HomeScreen}
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
          options={{
            title: "",
            tabBarShowLabel: false,
            headerShown: false,
          }}
          component={MeasurementStack}
        />
        <Tab.Screen
          name="CalculatorsStack"
          options={{
            title: "",
            tabBarShowLabel: false,
            headerShown: false,
          }}
          component={CalculatorStack}
        />
        <Tab.Screen
          name="ProfileStack"
          options={{ title: "", tabBarShowLabel: false, headerShown: false }}
          component={ProfileStack}
        />
        <Tab.Screen
          name="SettingsStack"
          options={{ title: "", tabBarShowLabel: false, headerShown: false }}
          component={SettingsStack}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={() => ({
            tabBarButton: () => null,
            headerStyle: {
              backgroundColor: bgColor,
            },
            headerTitleStyle: {
              color: fontColor,
            },
          })}
        />
        <Tab.Screen
          name="SignUp"
          component={SignUpScreen}
          options={() => ({
            tabBarButton: () => null,
            headerStyle: {
              backgroundColor: bgColor,
            },
            headerTitleStyle: {
              color: fontColor,
            },
          })}
        />
        <Tab.Screen
          name="UserGuide"
          component={UserGuideScreen}
          options={() => ({
            tabBarButton: () => null,
            headerStyle: {
              backgroundColor: bgColor,
            },
            headerTitleStyle: {
              color: fontColor,
            },
          })}
        />
      </Tab.Navigator>
    );
  };

  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  useEffect(() => {
    async function firstLaunch() {
      const hasSeenLaunchScreen = await AsyncStorage.getItem(
        "hasSeenLaunchScreen"
      );
      setIsFirstTime(hasSeenLaunchScreen === null);
    }
    firstLaunch();
  }, []);
  return (
    <SQLiteProvider databaseName={databaseName} onInit={initDatabase}>
      <AuthContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ title: "", headerShown: false }}>
            {isFirstTime ? (
              <Stack.Screen
                name="FirstLaunchScreen"
                component={FirstLaunchScreen}
              />
            ) : null}
            <Stack.Screen name="mainApp" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </AuthContextProvider>
    </SQLiteProvider>
  );
}
