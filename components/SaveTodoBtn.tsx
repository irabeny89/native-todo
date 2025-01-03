import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TodoContext } from "./TodoContextProvider";

export default function SaveBtn() {
  const todoCtx = useContext(TodoContext);
  const router = useRouter();

  const handleSave = () => {
    // `title` is required to create a todo
    if (todoCtx?.currentTitle) {
      todoCtx.mutateTodoStore({
        type: "save",
        value: {
          id: Date.now().toString(),
          title: todoCtx.currentTitle,
          description: todoCtx.currentDescription,
          todoItems: todoCtx.currentTodoItems,
          createdAt: new Date().toString(),
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
      <Pressable onPress={handleSave}>
        <Text style={styles.text}>Save</Text>
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
