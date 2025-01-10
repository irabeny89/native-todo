import NoTodoYet from "@/components/NoTodoYet";
import TodoInfo from "@/components/TodoInfo";
import { Fragment, useContext, useEffect } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { getTimeDiff } from "@/utils";
import type { Todo, TodoItemData } from "@/hooks/usePersistTodo";
import usePersistTodo from "@/hooks/usePersistTodo";
import { TODO_STORE_KEY } from "@/constants";
import AddTodoBtn from "@/components/AddTodoBtn";
import { TodoContext } from "@/components/TodoContextProvider";

const renderTodo = (todo: Todo) => {
  const deriveDoneTodosCount = (todo: TodoItemData[]) =>
    todo.reduce((acc, curr) => acc + Number(curr.isDone), 0);

  return (
    <TodoInfo
      title={todo.title}
      todoItemsCount={todo.todoItems.length}
      description={todo.description}
      createdAt={new Date(todo.createdAt).toLocaleDateString()}
      doneTodosCount={deriveDoneTodosCount(todo.todoItems)}
      id={todo.id}
      lastUpdate={getTimeDiff(new Date(todo.updatedAt).valueOf())}
    />
  );
};

export default function Index() {
  const { getStoredTodos } = usePersistTodo(TODO_STORE_KEY);
  const todoCtx = useContext(TodoContext);

  const getLatestTodos = () => {
    if (todoCtx) getStoredTodos().then(todoCtx.setStoredTodos);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // biome-ignore lint/correctness/useExhaustiveDependencies: not needed
  useEffect(() => {
    getLatestTodos();
  }, []);

  return !todoCtx ? null : (
    <Fragment>
      <View style={styles.addBtn}>
        <AddTodoBtn />
      </View>
      <View style={styles.container}>
        {todoCtx.storedTodos.length ? (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={getLatestTodos} />
            }
            data={todoCtx.storedTodos}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => renderTodo(item)}
          />
        ) : (
          <NoTodoYet />
        )}
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  plusSign: {
    fontSize: 95,
    textAlign: "center",
  },
  infoText: {
    width: 200,
    textAlign: "center",
    fontSize: 14,
  },
  addBtn: {
    position: "absolute",
    right: 30,
    bottom: 30,
    zIndex: 2,
  },
});
