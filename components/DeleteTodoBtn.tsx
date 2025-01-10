import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { StyleSheet, View, Alert, Button } from "react-native";
import { TodoContext } from "./TodoContextProvider";
import { COLORS, TODO_STORE_KEY } from "@/constants";
import usePersistTodo from "@/hooks/usePersistTodo";

export default function DeleteBtn() {
  const { id } = useLocalSearchParams();
  const todoCtx = useContext(TodoContext);
  const router = useRouter();
  const { deleteTodo } = usePersistTodo(TODO_STORE_KEY);

  const handleDelete = () => {
    if (todoCtx) {
      Alert.alert("Delete", "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress() {
            // delete the todo from storage
            deleteTodo(id as string).then((data) => {
              // update the stored todos in context
              todoCtx.setStoredTodos(data);
              // back to home screen
              router.dismissTo("/");
            });
          },
        },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Delete" color={COLORS.danger} onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
