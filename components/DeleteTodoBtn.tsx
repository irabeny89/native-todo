import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { TodoContext } from "./TodoContextProvider";

export default function DeleteBtn() {
  const { id } = useLocalSearchParams();
  const todoCtx = useContext(TodoContext);
  const router = useRouter();

  const handleDelete = () => {
    if (todoCtx) {
      Alert.alert("Delete", "Are you sure?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress() {
            todoCtx.mutateTodoStore({
              type: "delete",
              id: id as string,
            });
            // clear inputs
            todoCtx.setCurrentTitle("");
            todoCtx.setCurrentDescription("");
            todoCtx.setCurrentTodoItems([]);
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
