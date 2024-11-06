import { FlatList } from "react-native";
import TrainingItem from "./trainingItem";

type Props = {
  trainings: Training[];
  handleDeleteTraining: (id: number) => void;
};
export default function TrainingList({
  trainings,
  handleDeleteTraining,
}: Props) {
  return (
    <FlatList
      numColumns={2}
      data={trainings}
      className="flex-grow-0 mt-1 h-5/6 "
      columnWrapperStyle={{ justifyContent: "space-evenly" }}
      renderItem={({ item }) => (
        <TrainingItem training={item} handleDelete={handleDeleteTraining} />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
