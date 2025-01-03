import type { TodoItemData } from "@/components/TodoContextProvider";
import Checkbox from "expo-checkbox";
import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useState,
} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type TodoItemProps = {
  text: string;
  id: string;
  isDone: boolean;
  serialNumber: number;
  setTodoText: Dispatch<SetStateAction<string>>;
  setTodoItems: (value: SetStateAction<TodoItemData[]>) => void;
  editTodoItemIdRef: MutableRefObject<string>;
};
type OptionsOverlayProps = {
  editText: () => void;
  deleteItem: () => void;
};

const OptionsOverlay = ({ deleteItem, editText }: OptionsOverlayProps) => (
  <View style={styles.overlay}>
    <Pressable onPress={editText}>
      <Text style={styles.editBtn}>Edit</Text>
    </Pressable>
    <View style={styles.divider} />
    <Pressable onPress={deleteItem}>
      <Text style={styles.delBtn}>Delete</Text>
    </Pressable>
  </View>
);

export default function TodoItem({
  setTodoItems,
  text,
  id,
  isDone,
  serialNumber,
  setTodoText,
  editTodoItemIdRef,
}: TodoItemProps) {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };
  const toggleCheckbox = (prev: boolean) => {
    // toggle current todo item checkbox
    setTodoItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, isDone: !item.isDone } : item,
        )
        .sort((a, b) => +a.isDone - +b.isDone),
    );
  };
  const editText = () => {
    setTodoText(text);
    // set id to indicate edit mode
    editTodoItemIdRef.current = id;
  };
  const deleteItem = () => {
    setTodoItems((items) => items.filter((item) => item.id !== id));
    setTodoText("");
  };

  return (
    <Pressable onLongPress={toggleOptions}>
      <View style={[styles.container, showOptions ? styles.target : undefined]}>
        {showOptions && <OptionsOverlay {...{ deleteItem, editText }} />}
        <Text>{serialNumber}.</Text>
        <Checkbox value={isDone} onValueChange={toggleCheckbox} />
        <Text style={[isDone ? styles.todoText : undefined]}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 4,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  target: {
    borderColor: "grey",
    borderWidth: 2,
  },
  todoText: {
    color: "gray",
  },
  overlay: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    gap: 4,
  },
  editBtn: {
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  delBtn: {
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  divider: {
    backgroundColor: "grey",
    height: 24,
    width: 2,
    alignSelf: "center",
  },
});
