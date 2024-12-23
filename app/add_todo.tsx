import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  type TextInputSubmitEditingEventData,
  type NativeSyntheticEvent,
} from "react-native";
import { useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";
import type { TodoItemData } from "@/types";
import { Fragment } from "react";
import TodoItem from "@/components/TodoItem";
import { MARGIN_TOP } from "@/constants";

export default function AddTodo() {
  const [todos, setTodos] = useState<TodoItemData[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoText, setTodoText] = useState("");
  const [editableTodo, setEditableTodo] = useState<TodoItemData | null>(null);

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (todoText) {
      // in edit mode
      if (editableTodo) {
        todos.map((todo) => {
          if (todo.id === editableTodo.id) todo.text = todoText;
          return todo;
        });
        setEditableTodo(null); // clear edit
      }
      // append todo input to list of todos
      else
        setTodos((prev) => [
          {
            id: todos.length, // compute index from prev items
            text: todoText,
            isDone: false,
          },
          ...prev,
        ]);

      // clear input
      setTodoText("");
    }
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <CustomTextInput
          name="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Name your todos"
        />
        <CustomTextInput
          name="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Optional short description"
        />
        <ScrollView scrollEnabled style={styles.todoOutput}>
          <FlatList
            data={todos}
            renderItem={({ item, index }) => (
              <TodoItem
                {...item}
                todos={todos}
                setTodos={setTodos}
                serialNumber={index + 1}
                setTodoText={setTodoText}
                editableTodo={editableTodo}
                setEditableTodo={setEditableTodo}
              />
            )}
          />
        </ScrollView>
      </View>
      <CustomTextInput
        style={styles.todoInput}
        value={todoText}
        onChangeText={setTodoText}
        placeholder="Enter what you want to do..."
        onSubmitEditing={handleSubmit}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: MARGIN_TOP,
    marginBottom: 50,
    marginHorizontal: 5,
    gap: 24,
  },
  divider: {
    backgroundColor: "gray",
    height: 2,
    width: "96%",
    alignSelf: "center",
  },
  todoInput: {
    position: "fixed",
    bottom: 10,
    left: 6,
    width: "96%",
  },
  todoOutput: {},
});
