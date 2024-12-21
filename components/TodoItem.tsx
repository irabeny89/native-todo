import type { TodoItemProps } from "@/types";
import Checkbox from "expo-checkbox";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TodoItem({
  setTodos,
  todos,
  text,
  index,
}: TodoItemProps) {
  const todoData = todos.find((todo) => todo.index === index);
  const toggleCheckbox = (prev: boolean) => {
    // toggle current todo item checkbox value
    const updatedData = todos.map((todo) => {
      if (todo.index === index) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(updatedData);
  };

  return (
    <View style={styles.container}>
      <Text>{index + 1}.</Text>
      <Checkbox
        value={todoData?.isDone || false}
        onValueChange={toggleCheckbox}
      />
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
});
