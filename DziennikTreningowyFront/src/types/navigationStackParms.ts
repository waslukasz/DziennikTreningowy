import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Training: undefined;
  Exercises: {trainingId: number} ;
};

export type TrainingScreenProps = NativeStackScreenProps<
  RootStackParamList,'Training'
>;

export type ExerciseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Exercises'
>;
export type ExercisesScreenRouteProp = RouteProp<RootStackParamList, 'Exercises'>;
 