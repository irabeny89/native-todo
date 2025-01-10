import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import { TodoContext } from "./TodoContextProvider";
import usePersistTodo from "@/hooks/usePersistTodo";
import { COLORS, TODO_STORE_KEY } from "@/constants";

export default function UpdateBtn() {
  const todoCtx = useContext(TodoContext);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { updateTodo, getStoredTodos } = usePersistTodo(TODO_STORE_KEY);

  const handleUpdate = async () => {
    const data = await getStoredTodos();
    const oldTodo = data.find((todo) => todo.id === id);
    // `title` is required to create a todo
    if (todoCtx?.currentTitle && oldTodo) {
      // persist the todo to storage
      const latestTodos = await updateTodo({
        id: id as string,
        title: todoCtx.currentTitle,
        description: todoCtx.currentDescription,
        todoItems: todoCtx.currentTodoItems,
        createdAt: oldTodo.createdAt,
        updatedAt: new Date().toString(),
      });
      // update the stored todos in context
      todoCtx.setStoredTodos(latestTodos);
      // back to home screen
      router.dismissTo("/");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Update"
        disabled={!todoCtx?.currentTitle}
        onPress={handleUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
