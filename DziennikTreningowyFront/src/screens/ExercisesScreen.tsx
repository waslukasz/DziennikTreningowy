import { useRoute } from "@react-navigation/native";
import ExercisesList from "../components/exercisesList";
import {  ExercisesScreenRouteProp } from "../types/navigationStackParms";


export default function ExercisesScreen() {
  const route = useRoute<ExercisesScreenRouteProp>();
  const { trainingId } = route.params;
    return(<ExercisesList trainingId={trainingId}></ExercisesList>)
}