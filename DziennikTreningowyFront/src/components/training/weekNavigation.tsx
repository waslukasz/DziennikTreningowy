import { useState } from "react";
import PressableButton from "./pressableButton";

type Props = {
  handleWeekChange: (offset: number) => void;
  selectedWeek:number;
};

export default function WeekNavigation({ handleWeekChange,selectedWeek }: Props) {
  const handlePress = (offset: number) => {
    handleWeekChange(offset); 
  };

  return (
    <>
      <PressableButton
        text="Previous Week"
        onPress={() => handlePress(-1)}
        isSelected={selectedWeek === -1} 
      />
      <PressableButton
        text="This Week"
        onPress={() => handlePress(0)}
        isSelected={selectedWeek === 0} 
      />
      <PressableButton
        text="Next Week"
        onPress={() => handlePress(1)}
        isSelected={selectedWeek === 1} 
      />
       
    </>
  );
}
