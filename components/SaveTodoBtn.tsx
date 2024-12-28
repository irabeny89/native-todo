import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TodoContext } from "./TodoContextProvider";

export default function SaveBtn() {
  const todoCtx = useContext(TodoContext);
  const router = useRouter();

  const handleSave = () => {
    if (todoCtx) {
      const {
        title,
        description,
        todoItems,
        mutateTodoStore,
        setTitle,
        setDescription,
        setTodoItems,
      } = todoCtx;
      mutateTodoStore({
        type: "save",
        value: {
          id: Date.now().toString(),
          title,
          description,
          todoItems,
          createdAt: new Date().toLocaleDateString(),
          updatedAt: new Date().toLocaleDateString(),
        },
      });
      // clear inputs
      setTitle("");
      setDescription("");
      setTodoItems([]);
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
