import { ScrollView, View, Text } from "react-native";
// import GuideHeader from "../components/userGuide/GuideHeader";
// import GuideText from "../components/userGuide/GuideText.tsx";
// import GuideList from "../components/userGuide/GuideList";
// import Line from "../components/userGuide/Line";
import GuideHeader from "../components/userGuide/GuideHeader";
import GuideList from "../components/userGuide/GuideList";
import Line from "../components/userGuide/Line";
import GuideText from "../components/userGuide/GuideText";

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  return (
    <ScrollView>
      <View className="p-5 bg-zinc-100 dark:bg-zinc-500 min-h-screen items-center">
        <GuideHeader text="Starting screen" />
        <GuideList text="Here, you can enter your details, which will be saved in the app to enhance your experience, or you can skip this step and fill them in later." />
        <Line />
        <GuideHeader text="Home" />
        <GuideList text="You can access this section by clicking on the home icon in the bottom navigation." />
        <GuideList text="Here, you will find your daily dose of motivation in the form of quotes." />
        <GuideList text="You can also see your most recent workout. If you haven't added one yet, simply click on the text to do so. If a workout is already added, clicking on it will take you to detailed information." />
        <GuideList text="Below, you’ll find your most recent measurement. If you haven’t recorded one yet, you can add it by clicking on the text." />
        <GuideList text="Further down, there is a bar displaying the workouts completed this week. If a workout has been done on a given day, the checkmark will turn green." />
        <GuideList text="At the very bottom, you’ll find the navigation bar, which allows you to move around the app." />
        <Line />
        <GuideHeader text="Trainings" />
        <GuideList text="You can access this section by clicking on the dumbbell icon in the bottom navigation." />
        <GuideList
          text="Here, you will see your workouts completed within a specified time range.
By default, the current week is selected. Use the left arrow to go back one week and the right arrow to move forward. To set a custom date range, click on the date in the center of the screen. Select the start date on the left and the end date on the right."
        />
        <GuideList text="To add a new workout, click the green button in the top right corner and choose the workout date." />
        <GuideList text="Below, all workouts completed within the selected range will be displayed. Click on a workout tile to add performed exercises. Enter the exercise name, weight, repetitions, and sets, then click the green button to save. The added exercise will appear below." />
        <GuideList text="You can mark an exercise as completed by clicking the green circle. To edit an exercise, swipe the tile to the left and click the blue button, then update the correct details in the form at the top. To delete an exercise, swipe left and click the red button." />
        <Line />

        <GuideHeader text="Measurements" />
        <GuideList text="You can access this section by clicking on the scale icon in the bottom navigation." />
        <GuideList text="Here, you will find body measurements that you have entered." />
        <GuideList text="To add a new measurement, click the green button next to the selected body part or body weight, enter the correct data in the input fields provided and then confirm by clicking the green button to save the measurement." />
        <GuideList text="Once added, the measurement will be automatically displayed on the graph. To see the exact value, click on a point on the graph, and the value will be shown below." />
        <GuideList text="To view all measurements for a specific body part, click on its name." />
        <GuideList text="To edit a measurement, swipe the tile to the left, click the blue button, update the data in the form at the top of the page, and then click the green button. To delete a measurement, swipe left and click the red button." />
        <Line />
        <GuideHeader text="Calculators" />
        <GuideList text="You can access this section by clicking on the calculator icon in the bottom navigation." />
        <GuideText text="In this section, you will find various helpful calculators, such as:" />
        <GuideList text="BMI (Body Mass Index) – A measure of body fat based on weight and height, used to assess whether a person has a healthy body weight." />
        <GuideList text="1RM (One Repetition Maximum) – The maximum weight a person can lift for a single repetition of a given strength exercise." />
        <GuideList text="BMR (Basal Metabolic Rate) – The number of calories the body burns at rest to maintain basic physiological functions." />
        <GuideList text="WILKS (Wilks Score) – A formula used in powerlifting to evaluate a lifter’s strength relative to their body weight." />
        <GuideList text="HRMax (Maximum Heart Rate) – The highest heart rate a person can reach during intense exercise, typically estimated based on age." />
        <GuideList text="VO2 (VO2 Max, Maximum Oxygen Uptake) – The maximum amount of oxygen the body can use during intense exercise, indicating aerobic fitness." />
        <GuideList text="After clicking on the calculator you're interested in, you will be prompted to fill out a form. Once you click the green button, the calculated value will be displayed." />
        <Line />
        <GuideHeader text="User Options" />
        <GuideList text="You can access this section by clicking on the user icon in the bottom navigation." />
        <GuideList text="Here, you can log in by clicking the login button." />
        <GuideList text="By clicking on 'User profile' button, you can add or edit basic information such as your name, height, and weight." />
        <GuideList text="Clicking 'Delete all data' button will remove all local data." />
        <GuideText text="After loggin in, you will have access to:" />
        <GuideList text="The 'Set new password' button, which allows you to change your password after correctly filling out the form and pressing the green button." />
        <GuideList text="The 'Delete all data' button, which will remove all data stored in the cloud." />
        <GuideList text="The 'Delete account' button, which will delete your account." />
        <GuideList text="The 'Logout' button, which will log you out." />
        <Line />
        <GuideHeader text="Application settings" />
        <GuideList text="You can access this section by clicking on the gear icon in the bottom navigation." />
        <GuideList text="Here, you will find information about the app version, the documentation, and the option to enable dark mode." />
        <Line />
      </View>
    </ScrollView>
  );
};
export default SettingsScreen;
