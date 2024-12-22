import type { TodoItemProps } from "@/types";
import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View, Pressable } from "react-native";

export default function TodoItem({
  setTodos,
  todos,
  text,
  index,
  isDone,
  serialNumber,
  setTodoText,
  setEditableTodo,
  editableTodo,
}: TodoItemProps) {
  const toggleCheckbox = (prev: boolean) => {
    // toggle current todo item checkbox value
    const updatedData = todos
      .map((todo) => {
        if (todo.index === index) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      })
      .sort((a, b) => +a.isDone - +b.isDone);
    setTodos(updatedData);
  };

  const editText = () => {
    setEditableTodo({ index, isDone, text });
    setTodoText(text);
  };

  const deleteItem = () => {
    setTodos(todos.filter((todo) => todo.index !== index));
    if (editableTodo?.index === index) setTodoText("");
  };

  return (
    <View style={styles.container}>
      <Text>{serialNumber}.</Text>
      <Checkbox value={isDone} onValueChange={toggleCheckbox} />
      <Pressable onLongPress={editText}>
        <Text
          style={[
            isDone ? styles.todoText : undefined,
            editableTodo?.index === index ? styles.todoTextEditable : undefined,
          ]}
        >
          {text}
        </Text>
      </Pressable>
      <Pressable onPress={deleteItem}>
        <Text style={styles.deleteIcon}>{"🗑"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  todoText: {
    color: "gray",
  },
  todoTextEditable: {
    textDecorationLine: "underline",
    backgroundColor: "lightgray",
  },
  deleteIcon: {
    backgroundColor: "red",
    borderRadius: 2,
    padding: 2,
  },
});
