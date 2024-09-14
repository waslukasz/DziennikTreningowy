import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Menu: undefined;
  Home: undefined;
  Training: undefined;
  Exercises: {trainingId: number} ;
};

export type TrainingScreenProps = NativeStackNavigationProp<
  RootStackParamList,'Training'
>;

export type ExerciseScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Exercises'
>;
export type ExercisesScreenRouteProp = RouteProp<RootStackParamList, 'Exercises'>;
 