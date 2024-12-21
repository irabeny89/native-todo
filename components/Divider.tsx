import { View, StyleSheet } from "react-native";

export default function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: "gray",
    height: 2,
    width: "96%",
    alignSelf: "center",
  },
});
