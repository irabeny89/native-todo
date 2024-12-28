import { useContext } from "react";
import SaveBtn from "./SaveTodoBtn";
import { TodoContext } from "./TodoContextProvider";
import UpdateBtn from "./updateTodoBtn";
import { StyleSheet, View } from "react-native";
import DeleteBtn from "./DeleteTodoBtn";

export default function MutateAction() {
  const todoCtx = useContext(TodoContext);

  if (todoCtx?.title && !todoCtx?.editableTodoId) return <SaveBtn />;
  if (todoCtx?.editableTodoId)
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
  return null;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  divider: {
    backgroundColor: "gray",
    height: 15,
    width: 1,
    alignSelf: "center",
  },
});
