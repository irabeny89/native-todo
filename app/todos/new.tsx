import CustomTextInput from "@/components/CustomTextInput";
import TodoItem from "@/components/TodoItem";
import { MARGIN_TOP } from "@/constants";
import useTodoControl from "@/hooks/useTodoControl";
import { Fragment } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function AddTodo() {
  const todoCtrl = useTodoControl();

  if (todoCtrl.todoCtx) {
    const {
      currentDescription,
      currentTitle,
      currentTodoItems,
      setCurrentDescription,
      setCurrentTitle,
      setCurrentTodoItems,
    } = todoCtrl.todoCtx;
    return (
      <Fragment>
        <View style={styles.container}>
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
  return null;
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
