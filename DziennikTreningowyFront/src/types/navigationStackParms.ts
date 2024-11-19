import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Menu: undefined;
  BodyMeasurment: undefined;
  AddMeasurement: undefined;
  Home: undefined;
  Training: undefined;
  Exercises: { trainingId: number };
  MeasurementDetails: undefined;
  Calculators: undefined;
  BmiCalculator: undefined;
  OneRepMaxCalculator: undefined;
  BmrCalculator: undefined;
  WilksCalculator: undefined;
  Login:undefined,
  SingUp:undefined,
};
export type TrainingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Training"
>;

export type ExerciseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Exercises"
>;
export type ExerciseScreenNavigateProp = NativeStackNavigationProp<
  RootStackParamList,
  "Exercises"
>;
