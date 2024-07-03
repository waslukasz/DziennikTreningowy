import PressableButton from "./pressableButton";

type Props = {
  handleWeekChange: (offset: number) => void;
};
export default function WeekNavigation({ handleWeekChange }: Props) {
  return (
    <>
      <PressableButton
        text="Previous Week"
        onPress={() => handleWeekChange(-1)}
      />
      <PressableButton text="This Week" onPress={() => handleWeekChange(0)} />
      <PressableButton text="Next Week" onPress={() => handleWeekChange(1)} />
    </>
  );
}
