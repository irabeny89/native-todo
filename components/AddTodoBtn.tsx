import { Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function AddTodoBtn() {
  return (
    <Text style={styles.text}>
      <Link href="/todos/new">Add New</Link>
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
  },
});
