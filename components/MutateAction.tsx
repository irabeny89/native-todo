import { StyleSheet, View } from "react-native";
import UpdateBtn from "./updateTodoBtn";
import DeleteBtn from "./DeleteTodoBtn";

export default function MutateAction() {
  return (
    <View style={styles.container}>
      <DeleteBtn />
      <UpdateBtn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
  },
});
