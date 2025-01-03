import CustomTextInput from "@/components/CustomTextInput";
import TodoItem from "@/components/TodoItem";
import { MARGIN_TOP } from "@/constants";
import useTodoControl from "@/hooks/useTodoControl";
import { useLocalSearchParams } from "expo-router";
import { Fragment, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function EditTodo() {
  const { id } = useLocalSearchParams();
  const todoCtrl = useTodoControl();

  if (!todoCtrl.todoCtx) return null;

  const editableTodo = todoCtrl.todoCtx.todoStore.find(
    (todo) => todo.id === id,
  );

  if (!editableTodo) return null;

  const {
    currentTodoItems,
    setCurrentDescription,
    setCurrentTitle,
    setCurrentTodoItems,
  } = todoCtrl.todoCtx;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // biome-ignore lint/correctness/useExhaustiveDependencies: not needed
  useEffect(() => {
    // set selected todo values to current context
    setCurrentTodoItems(editableTodo.todoItems);
    return () => {
      // clear todo items on unmount
      setCurrentTodoItems([]);
    };
  }, []);

  return (
    <Fragment>
      <View style={styles.container}>
        <CustomTextInput
          name="Title"
          defaultValue={editableTodo.title}
          onChangeText={setCurrentTitle}
          placeholder="Name your todos"
        />
        <CustomTextInput
          name="Description"
          defaultValue={editableTodo.description}
          onChangeText={setCurrentDescription}
          placeholder="Optional short description"
        />
        <FlatList
          style={styles.todoOutput}
          data={currentTodoItems}
          keyExtractor={({ id }) => id}
          renderItem={({ item, index }) => (
            <TodoItem
              {...item}
              setTodoItems={setCurrentTodoItems}
              serialNumber={index + 1}
              setTodoText={todoCtrl.setTodoText}
              editTodoItemIdRef={todoCtrl.editTodoItemIdRef}
            />
          )}
        />
      </View>
      <CustomTextInput
        style={styles.todoInput}
        value={todoCtrl.todoText}
        onChangeText={todoCtrl.setTodoText}
        placeholder="Enter what you want to do..."
        onSubmitEditing={todoCtrl.handleSubmit}
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
