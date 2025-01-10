import CustomTextInput from "@/components/CustomTextInput";
import TodoItem from "@/components/TodoItem";
import { BOXED_STYLES, MARGINS, TODO_STORE_KEY } from "@/constants";
import useTodoItemControl from "@/hooks/useTodoItemControl";
import { useLocalSearchParams } from "expo-router";
import { Fragment, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import usePersistTodo from "@/hooks/usePersistTodo";
import { sortDoneLast } from "@/utils";
import MutateAction from "@/components/MutateAction";

export default function EditTodo() {
  const { id } = useLocalSearchParams();
  const todoCtrl = useTodoItemControl();
  const { getStoredTodos } = usePersistTodo(TODO_STORE_KEY);

  if (!todoCtrl.todoCtx) return null;

  const {
    currentTodoItems,
    currentDescription,
    currentTitle,
    setCurrentDescription,
    setCurrentTitle,
    mutateCurrentTodoItems,
  } = todoCtrl.todoCtx;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // biome-ignore lint/correctness/useExhaustiveDependencies: not needed
  useEffect(() => {
    // get stored todos and set default todo data
    getStoredTodos().then((todos) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        setCurrentTitle(todo.title);
        setCurrentDescription(todo.description ?? "");
        mutateCurrentTodoItems({
          name: "SET_DEFAULT",
          value: todo.todoItems,
        });
      }
    });
  }, []);

  return (
    <Fragment>
      <View style={styles.container}>
        <MutateAction />
        <CustomTextInput
          name="Title"
          value={currentTitle}
          onChangeText={setCurrentTitle}
          placeholder="Name your todos"
        />
        <CustomTextInput
          name="Description"
          value={currentDescription}
          onChangeText={setCurrentDescription}
          placeholder="Optional short description"
        />
        <FlatList
          style={styles.todoOutput}
          data={currentTodoItems.sort(sortDoneLast)}
          keyExtractor={({ id }) => id}
          renderItem={({ item, index }) => (
            <TodoItem
              {...item}
              serialNumber={index + 1}
              setTodoText={todoCtrl.setTodoText}
              mutateCurrentTodoItems={mutateCurrentTodoItems}
              currentTodoItemEditIdRef={todoCtrl.currentTodoItemEditIdRef}
            />
          )}
        />
      </View>
      <CustomTextInput
        style={styles.todoInput}
        value={todoCtrl.todoText}
        onChangeText={todoCtrl.setTodoText}
        placeholder="Enter what you want to do..."
        onSubmitEditing={todoCtrl.handleTodoItemSubmit}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    ...BOXED_STYLES.column,
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
