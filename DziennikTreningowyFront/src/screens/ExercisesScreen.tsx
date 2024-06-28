import { useRoute } from "@react-navigation/native";
import ExercisesList from "../components/exercisesList";
import { ExerciseScreenProps, ExercisesScreenRouteProp } from "../types/navigationStackParms";
import TrainingsScreen from "./TrainingsScreen";


export default function ExercisesScreen() {
  const route = useRoute<ExercisesScreenRouteProp>();
  const { trainingId } = route.params;
    return(<ExercisesList trainingId={trainingId}></ExercisesList>)
}