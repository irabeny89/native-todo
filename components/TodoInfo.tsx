import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { TodoContext } from "./TodoContextProvider";
import { useRouter } from "expo-router";
import usePersistTodo from "@/hooks/usePersistTodo";
import { TODO_STORE_KEY } from "@/constants";

type TodoInfoProps = {
  id: string;
  title: string;
  description?: string;
  doneTodosCount: number;
  todoItemsCount: number;
  createdAt: string;
  lastUpdate: string;
};

export default function TodoInfo(props: TodoInfoProps) {
  const router = useRouter();
  const todoCtx = useContext(TodoContext);
  const { deleteTodo } = usePersistTodo(TODO_STORE_KEY);

  const handleDelete = () => {
    deleteTodo(props.id).then((data) => {
      // update the stored todos in context
      todoCtx?.setStoredTodos(data);
    });
  };
  const handlePress = () => {
    todoCtx?.setCurrentTitle(props.title);
    router.push(`/todos/${props.id}`);
  };
  const handleLongPress = () => {
    Alert.alert(
      "Delete",
      "Are you sure to delete this todo group and all its contents?",
      [
        { style: "cancel", text: "Cancel" },
        { style: "destructive", text: "Delete", onPress: handleDelete },
      ],
    );
  };

  return (
    <Pressable onPress={handlePress} onLongPress={handleLongPress}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.descText}>{props.description}</Text>
        <View style={styles.info}>
          <View style={styles.xAxis}>
            <MaterialIcons name="calendar-month" />
            <Text style={styles.infoText}>{props.createdAt}</Text>
          </View>
          <View style={styles.xAxis}>
            <MaterialIcons name="task-alt" />
            <Text style={styles.infoText}>
              {props.doneTodosCount} / {props.todoItemsCount}
            </Text>
          </View>
          <View style={styles.xAxis}>
            <MaterialIcons name="av-timer" />
            <Text style={styles.infoText}>{props.lastUpdate}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "lightgrey",
    padding: 6,
    marginBottom: 5,
  },
  titleText: {
    fontWeight: "bold",
  },
  descText: {
    fontSize: 12,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginTop: 4,
  },
  infoText: {
    fontSize: 10,
    color: "grey",
  },
  xAxis: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
