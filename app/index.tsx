import NoTodoYet from "@/components/NoTodoYet";
import {
  TodoContext,
  type Todo,
  type TodoItemData,
} from "@/components/TodoContextProvider";
import TodoInfo from "@/components/TodoInfo";
import { Fragment, useContext, useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { getTimeDiff } from "@/utils";
import { useRouter } from "expo-router";

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const todoCtx = useContext(TodoContext);
  const todoStore = todoCtx?.todoStore ?? [];

  const deriveDoneTodosCount = (todo: TodoItemData[]) =>
    todo.reduce((acc, curr) => acc + Number(curr.isDone), 0);

  const onRefresh = () => {
    router.push("/");
  };

  const renderTodo = (todo: Todo) => (
    <TodoInfo
      createdAt={new Date(todo.createdAt).toLocaleDateString()}
      doneTodosCount={deriveDoneTodosCount(todo.todoItems)}
      id={todo.id}
      lastUpdate={getTimeDiff(new Date(todo.updatedAt).valueOf())}
      title={todo.title}
      todoItemsCount={todo.todoItems.length}
      description={todo.description}
    />
  );

  return (
    <View style={styles.container}>
      {todoStore.length ? (
        <Fragment>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={todoStore}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => renderTodo(item)}
          />
        </Fragment>
      ) : (
        <NoTodoYet />
      )}
    </View>
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
});
