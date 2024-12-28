import CustomTextInput from "@/components/CustomTextInput";
import { TodoContext } from "@/components/TodoContextProvider";
import TodoItem from "@/components/TodoItem";
import { MARGIN_TOP } from "@/constants";
import { useContext, useState } from "react";
import { Fragment } from "react";
import {
  FlatList,
  type NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  type TextInputSubmitEditingEventData,
  View,
} from "react-native";

export type TodoItemData = {
  id: string;
  isDone: boolean;
  text: string;
};

export default function AddTodo() {
  const [todoText, setTodoText] = useState("");

  const todoCtx = useContext(TodoContext);

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (todoText && todoCtx) {
      const {
        editableTodoItemId,
        setEditableTodoItemId,
        setTodoItems,
        todoItems,
      } = todoCtx;
      // in edit mode
      if (editableTodoItemId) {
        todoItems.map((todo) => {
          if (todo.id === editableTodoItemId) todo.text = todoText;
          return todo;
        });
        setEditableTodoItemId(""); // clear edit
      }
      // append todo input to list of todos
      else
        setTodoItems((prev) => [
          {
            id: Date.now().toString(), // compute index from prev items
            text: todoText,
            isDone: false,
          },
          ...prev,
        ]);

      // clear input
      setTodoText("");
    }
  };

  return !todoCtx ? null : (
    <Fragment>
      <View style={styles.container}>
        <CustomTextInput
          name="Title"
          value={todoCtx?.title ?? ""}
          onChangeText={todoCtx.setTitle}
          placeholder="Name your todos"
        />
        <CustomTextInput
          name="Description"
          value={todoCtx?.description ?? ""}
          onChangeText={todoCtx.setDescription}
          placeholder="Optional short description"
        />
        <FlatList
          style={styles.todoOutput}
          data={todoCtx?.todoItems}
          renderItem={({ item, index }) => (
            <TodoItem
              {...item}
              todos={todoCtx?.todoItems ?? []}
              setTodos={todoCtx.setTodoItems}
              serialNumber={index + 1}
              setTodoText={setTodoText}
              editableTodoItemId={todoCtx.editableTodoItemId}
              setEditableTodoItemId={todoCtx.setEditableTodoItemId}
            />
          )}
        />
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
    marginBottom: 35,
    marginHorizontal: 15,
    gap: 24,
  },
  todoInput: {
    position: "fixed",
    bottom: 20,
    left: 18,
    width: "90%",
    backgroundColor: "lightgray",
  },
  todoOutput: {},
});
