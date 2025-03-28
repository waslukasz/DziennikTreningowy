import { RouteProp, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, TextInput, View } from "react-native";
import { BodyMeasurements } from "../../types/bodyMeasurementsType";
import MeasurementDetailsItem from "../../components/measurement/MeasurementDetailsItem";
import { SwipeListView } from "react-native-swipe-list-view";
import MeasurementDetailsHiddenItem from "../../components/measurement/MeasurementDetailsHiddenItem";
import {
  deleteBodyMeasurements,
  updateBodyMeasurements,
} from "../../database/repositories/bodyMeasurementRepository";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../components/auth/authContext";

type RouteParams = {
  MeasurementDetails: {
    title: string;
    data: BodyMeasurements[];
  };
};

const MeasurementDetailsScreen = ({ navigation }: { navigation: any }) => {
  const route = useRoute<RouteProp<RouteParams, "MeasurementDetails">>();
  const auth=useContext(AuthContext);
  const title: string = route.params?.title;
  const dataFromRoute: BodyMeasurements[] = route.params?.data;
  const [measurementsData, setMeasurementsData] =
    useState<BodyMeasurements[]>(dataFromRoute);
  const [editedItemIndex, setEditedItemIndex] = useState(-1);
  const [editedItem, setEditedItem] = useState<BodyMeasurements>();
  const [newItemValue, setNewItemValue] = useState<string>();
  const slideAnim = useRef(new Animated.Value(-200)).current;
  const unit = title == "Body Weight" ? " kg" : " cm";

  useEffect(() => {
    if (measurementsData) {
      navigation.setOptions({
        title: title + " details",
      });
    }
  }, [measurementsData, navigation]);

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: -200,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setEditedItem(undefined));
  };

  useEffect(() => {
    if (editedItem) {
      slideIn();
    }
  }, [editedItem]);

  async function deleteMeasurement(id: string) {
    if (id) {
      const result = await deleteBodyMeasurements(id,auth.isAuthenticated);
      if (result) {
        const temp = measurementsData.filter((i) => i.id != id);
        setMeasurementsData(temp);
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: "Successfully deleted measurement!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: "Failed to delete measurement!",
        });
      }
    }
  }

  async function editMeasurement() {
    const newItem: BodyMeasurements = {
      id: editedItem!.id,
      value: parseFloat(newItemValue!),
      bodyPart: editedItem!.bodyPart,
      date: editedItem!.date,
    };

    const result = await updateBodyMeasurements(newItem,auth.isAuthenticated);
    if (result) {
      slideOut();
      const updatedData: BodyMeasurements[] = measurementsData!.map((i) => {
        if (i.id === newItem.id) {
          return newItem;
        }
        return i;
      });
      setMeasurementsData(updatedData);
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Successfully edited measurement!",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Failed to edit measurement!",
      });
    }
  }
  function showEditField(item: BodyMeasurements) {
    setNewItemValue(item.value.toString());
    setEditedItem(item);
  }
  return (
    <View className="flex justify-center p-2 bg-zinc-100 dark:bg-zinc-500 min-h-screen">
      {editedItem ? (
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
          className="min-h-32 bg-white dark:bg-zinc-400 mb-10 p-2 rounded-md shadow-sm shadow-black flex items-center"
        >
          <TextInput
            className="text-black px-4 h-12 bg-white my-2 border border-zinc-300 w-72 rounded-xl text-center dark:bg-zinc-400 dark:border-white dark:border-2 dark:text-white"
            value={newItemValue!}
            onChangeText={(text) => {
              if (!isNaN(+text)) {
                setNewItemValue(text);
              }
            }}
            placeholderTextColor="gray"
            keyboardType="number-pad"
          />

          <View className="flex-row justify-end">
            <Pressable
              className=" bg-red-400 py-2 px-5 mr-2 mt-2 rounded-xl dark:bg-red-700"
              onPress={() => {
                slideOut();
              }}
            >
              <Text className="text-white text-xl">Cancel</Text>
            </Pressable>

            <Pressable className=" bg-green-400 py-2 px-5 mt-2 rounded-xl dark:bg-green-700">
              <Text className="text-white text-xl" onPress={editMeasurement}>
                Save
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      ) : null}
      {measurementsData ? (
        <SwipeListView
          data={measurementsData}
          closeOnScroll={true}
          renderItem={(data) => (
            <MeasurementDetailsItem
              item={data.item}
              unit={unit}
              diff={
                data.index < measurementsData.length - 1
                  ? data.item.value - measurementsData[data.index + 1].value
                  : 0
              }
              lastItemIndex={measurementsData.length}
              index={data.index}
            />
          )}
          renderHiddenItem={(data) => (
            <MeasurementDetailsHiddenItem
              item={data.item}
              deleteMeasurement={deleteMeasurement}
              editMeasurement={showEditField}
            />
          )}
          rightOpenValue={-180}
          disableRightSwipe={true}
          stopRightSwipe={-180}
        />
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
};

export default MeasurementDetailsScreen;
