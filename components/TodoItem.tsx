import type { TodoItemProps } from "@/types";
import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";

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
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    if (showOptions) {
      setEditableTodo(null);
      setShowOptions(false);
    } else setShowOptions(true);
  };
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
    <Pressable onLongPress={toggleOptions}>
      <View style={[styles.container, showOptions ? styles.target : undefined]}>
        {showOptions && (
          <View style={styles.overlay}>
            <Pressable onPress={editText}>
              <Text style={styles.editBtn}>Edit</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable onPress={deleteItem}>
              <Text style={styles.delBtn}>Delete</Text>
            </Pressable>
          </View>
        )}
        <Text>{serialNumber}.</Text>
        <Checkbox value={isDone} onValueChange={toggleCheckbox} />
        <Text style={[isDone ? styles.todoText : undefined]}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 4,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  target: {
    borderColor: "grey",
    borderWidth: 2,
  },
  todoText: {
    color: "gray",
  },
  overlay: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    gap: 4,
  },
  editBtn: {
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  delBtn: {
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  divider: {
    backgroundColor: "grey",
    height: 24,
    width: 2,
    alignSelf: "center",
  },
});
