import { StyleSheet, View, Text } from "react-native";
import { Link } from "expo-router";
import { Fragment } from "react";

export default function NoTodoYet() {
  return (
    <Fragment>
      <View style={styles.addWrapper}>
        <View>
          <Link href="/todos/new">
            <Text style={styles.plusSign}>+</Text>
          </Link>
        </View>
        <View>
          <Text style={styles.infoText}>
            Tap to start adding what you want to do.
          </Text>
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
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
