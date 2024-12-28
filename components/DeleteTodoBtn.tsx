import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { TodoContext } from "./TodoContextProvider";

export default function DeleteBtn() {
  const todoCtx = useContext(TodoContext);
  const router = useRouter();

  const handleDelete = () => {
    if (todoCtx) {
      const {
        mutateTodoStore,
        editableTodoId,
        setTitle,
        setDescription,
        setTodoItems,
        setEditableTodoId,
      } = todoCtx;
      Alert.alert("Delete", "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress() {
            mutateTodoStore({
              type: "delete",
              id: editableTodoId,
            });
            // clear edit mode
            setEditableTodoId("");
            // clear inputs
            setTitle("");
            setDescription("");
            setTodoItems([]);
            // back to home screen
            router.dismissTo("/");
          },
        },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handleDelete}>
        <Text style={styles.text}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginRight: 10,
  },
  text: {
    color: "red",
    fontWeight: "bold",
  },
});
