import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, TextInput, View } from "react-native";
import { BodyMeasurements } from "../types/bodyMeasurementsType";
import MeasurementDetailsItem from "../components/measurement/MeasurementDetailsItem";
import { SwipeListView } from "react-native-swipe-list-view";
import MeasurementDetailsHiddenItem from "../components/measurement/MeasurementDetailsHiddenItem";
import {
  deleteBodyMeasurements,
  updateBodyMeasurements,
} from "../database/repositories/bodyMeasurementRepository";
import Toast from "react-native-toast-message";

type RouteParams = {
  MeasurementDetails: {
    title: string;
    data: BodyMeasurements[];
  };
};

const MeasurementDetailsScreen = ({ navigation }: { navigation: any }) => {
  const route = useRoute<RouteProp<RouteParams, "MeasurementDetails">>();

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

  async function deleteMeasurement(id: number) {
    if (id) {
      const result = await deleteBodyMeasurements(id);
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

    const result = await updateBodyMeasurements(newItem);
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
    <View className="flex justify-center p-2 ">
      {editedItem ? (
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
          className="min-h-32 bg-white mb-10 p-2 rounded-md shadow-sm shadow-black flex items-center"
        >
          <TextInput
            className="text-black px-4 h-12 bg-gray-50 my-2 w-72 rounded-xl text-center border-2"
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
              className=" bg-red-400 py-2 px-5 mr-2 mt-2 rounded-xl"
              onPress={() => {
                slideOut();
              }}
            >
              <Text className="text-white text-xl">Cancel</Text>
            </Pressable>

            <Pressable className=" bg-green-400 py-2 px-5 mt-2 rounded-xl">
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
