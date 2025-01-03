import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TodoContext } from "./TodoContextProvider";

export default function UpdateBtn() {
  const todoCtx = useContext(TodoContext);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const handleUpdate = () => {
    const oldTodo = todoCtx?.todoStore.find((todo) => todo.id === id);
    // `title` is required to create a todo
    if (todoCtx?.currentTitle && oldTodo) {
      todoCtx.mutateTodoStore({
        type: "update",
        id: id as string,
        value: {
          id: id as string,
          title: todoCtx.currentTitle,
          description: todoCtx.currentDescription,
          todoItems: todoCtx.currentTodoItems,
          createdAt: oldTodo.createdAt,
          updatedAt: new Date().toString(),
        },
      });
      // clear inputs
      todoCtx.setCurrentTitle("");
      todoCtx.setCurrentDescription("");
      todoCtx.setCurrentTodoItems([]);
      // back to home screen
      router.dismissTo("/");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleUpdate}>
        <Text style={styles.text}>Update</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  text: {
    fontWeight: "bold",
  },
});
