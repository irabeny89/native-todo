import CustomTextInput from "@/components/CustomTextInput";
import SaveBtn from "@/components/SaveTodoBtn";
import TodoItem from "@/components/TodoItem";
import { BOXED_STYLES, COLORS, MARGINS } from "@/constants";
import useTodoItemControl from "@/hooks/useTodoItemControl";
import { sortDoneLast } from "@/utils";
import { Fragment, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function AddTodo() {
  const todoCtrl = useTodoItemControl();

  if (todoCtrl.todoCtx) {
    const {
      currentTitle,
      currentDescription,
      setCurrentTitle,
      setCurrentDescription,
      currentTodoItems,
      mutateCurrentTodoItems,
    } = todoCtrl.todoCtx;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // biome-ignore lint/correctness/useExhaustiveDependencies: not needed
    useEffect(() => {
      // clear current todo item inputs on mount
      setCurrentTitle("");
      setCurrentDescription("");
      mutateCurrentTodoItems({ name: "CLEAR" });
    }, []);

    return (
      <Fragment>
        <SaveBtn />
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
  return null;
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
    backgroundColor: COLORS.secondary,
  },
  todoOutput: {},
});
