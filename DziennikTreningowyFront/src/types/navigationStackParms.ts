import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  BodyMeasurment: undefined;
  AddMeasurement: undefined;
  Training: undefined;
  Exercises: { trainingId: number };
  MeasurementDetails: undefined;
  Calculators: undefined;
  BmiCalculator: undefined;
  OneRepMaxCalculator: undefined;
  BmrCalculator: undefined;
  WilksCalculator: undefined;
  Login: undefined;
  SignUp: undefined;
  HRMax: undefined;
  VO2Max: undefined;
  FirstLaunchScreen: undefined;
  mainApp: any;
};
export type TrainingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Training"
>;

export type LoginScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "Login",
  "SignUp"
>;
export type SignUpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SignUp"
>;
export type ExerciseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Exercises"
>;
export type ExerciseScreenNavigateProp = NativeStackNavigationProp<
  RootStackParamList,
  "Exercises"
>;
