import type { TodoItemData, TodoItemProps } from "@/types";
import Checkbox from "expo-checkbox";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TodoItem({
  setTodos,
  todos,
  text,
  index,
  isDone,
  serialNumber,
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

  return (
    <View style={styles.container}>
      <Text>{serialNumber}.</Text>
      <Checkbox value={isDone} onValueChange={toggleCheckbox} />
      <Text style={isDone ? styles.todoText : undefined}>{text}</Text>
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
});
