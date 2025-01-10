import { Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { COLORS, SHADOWS } from "@/constants";

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
    fontSize: 16,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 10,
    ...SHADOWS.medium,
  },
});
