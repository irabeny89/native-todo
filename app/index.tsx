import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/add_todo" style={styles.link}>
        <View>
          <Text style={styles.plusSign}>+</Text>
        </View>
        <View>
          <Text style={styles.infoText}>
            Tap to start adding what you want to do.
          </Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  plusSign: {
    fontSize: 95,
  },
  infoText: {
    width: 200,
    textAlign: "center",
    fontSize: 14,
  },
});
