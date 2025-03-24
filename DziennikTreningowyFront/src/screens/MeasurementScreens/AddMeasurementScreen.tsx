import { Text } from "react-native";
import MeasurementInput from "../../components/measurement/measurmentInput";

const AddMeasurementScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { measurementPart } = route.params;
  return (
    <MeasurementInput
      navigation={navigation}
      measurementPart={measurementPart}
    />
  );
};

export default AddMeasurementScreen;
