import { StyleSheet, View } from "react-native";
import UpdateBtn from "./updateTodoBtn";
import DeleteBtn from "./DeleteTodoBtn";

export default function MutateAction() {
  return (
    <View style={styles.container}>
      <View>
        <DeleteBtn />
      </View>
      <View>
        <UpdateBtn />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
});
