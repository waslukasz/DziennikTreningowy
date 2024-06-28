import { useEffect, useState } from "react"
import { View,Text, FlatList } from "react-native"
import { createExercise, getAllExercises, getExerciseById } from "../database/repositories/exercisesRepository";
import { useSQLiteContext } from "expo-sqlite";
import ExercieseInput from "./exercieseInput";
import ExercieseItem from "./exerciseItem";
interface Props{
    trainingId:number
}
export default function ExercisesList({trainingId}:Props){
    const [exercises,setExercises]=useState<Exercise[]>([]);
    const db=useSQLiteContext();
    useEffect(()=>{
        (async ()=>{
            getExercises();
        })()
    },[])
    const getExercises=async()=>{
        const data=await getAllExercises(db,trainingId)
        setExercises(data);
    }
    const handleCreateExercise=(newExercise:Exercise)=>{
        createExercise(db,newExercise);
        getExercises()
    }
    return(
    <View className="mt-12">
        <ExercieseInput trainingId={trainingId} handleCreateExercise={handleCreateExercise}></ExercieseInput>
       <FlatList
          numColumns={1}
          data={exercises}
          className="flex-grow-0 mt-5 h-4/6"
          renderItem={({ item }) =><ExercieseItem exercise={item}></ExercieseItem>}
          keyExtractor={(item) => item.id!.toString()}
        />
    </View>)
}