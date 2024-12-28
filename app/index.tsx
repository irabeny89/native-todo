import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.addWrapper}>
        <View>
          <Link href="/add_todo">
            <Text style={styles.plusSign}>+</Text>
          </Link>
        </View>
        <View>
          <Text style={styles.infoText}>
            Tap to start adding what you want to do.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  plusSign: {
    fontSize: 95,
    textAlign: "center",
  },
  infoText: {
    width: 200,
    textAlign: "center",
    fontSize: 14,
  },
});
