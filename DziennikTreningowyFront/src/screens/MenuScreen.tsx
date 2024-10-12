import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const MenuScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tile}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Training")}
        >
          <FontAwesome6 name="dumbbell" size={54} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.tile}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("BodyMeasurment")}
        >
          <FontAwesome6 name="weight-scale" size={54} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  tile: {
    borderWidth: 1,
    width: 125,
    height: 125,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderColor: "#cbcbcb",
    marginBottom: 20,
  },
  button: {
    width: 125,
    height: 125,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
