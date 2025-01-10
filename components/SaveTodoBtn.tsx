import { useRouter } from "expo-router";
import { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import { TodoContext } from "./TodoContextProvider";
import { COLORS, MARGINS, TODO_STORE_KEY } from "@/constants";
import usePersistTodo from "@/hooks/usePersistTodo";

export default function SaveBtn() {
  const todoCtx = useContext(TodoContext);
  const router = useRouter();
  const { persistTodo } = usePersistTodo(TODO_STORE_KEY);

  const handleSave = async () => {
    // `title` is required to create a todo
    if (todoCtx?.currentTitle) {
      // persist the todo to storage
      const latestTodos = await persistTodo({
        id: Date.now().toString(),
        title: todoCtx.currentTitle,
        description: todoCtx.currentDescription,
        todoItems: todoCtx.currentTodoItems,
        createdAt: new Date().toString(),
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
        title="Save"
        disabled={!todoCtx?.currentTitle}
        onPress={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: MARGINS.top,
    marginHorizontal: MARGINS.horizontal,
  },
});
