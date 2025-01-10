import Checkbox from "expo-checkbox";
import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { TodoItemAction } from "./TodoContextProvider";

type TodoItemProps = {
  text: string;
  id: string;
  isDone: boolean;
  serialNumber: number;
  setTodoText: Dispatch<SetStateAction<string>>;
  mutateCurrentTodoItems: (value: TodoItemAction) => void;
  currentTodoItemEditIdRef: MutableRefObject<string>;
};
type OptionsOverlayProps = {
  setEditText: () => void;
  deleteItem: () => void;
};

const OptionsOverlay = ({ deleteItem, setEditText }: OptionsOverlayProps) => (
  <View style={styles.overlay}>
    <Pressable onPress={setEditText}>
      <Text style={styles.editBtn}>Edit</Text>
    </Pressable>
    <View style={styles.divider} />
    <Pressable onPress={deleteItem}>
      <Text style={styles.delBtn}>Delete</Text>
    </Pressable>
  </View>
);

export default function TodoItem({
  text,
  id,
  isDone,
  serialNumber,
  setTodoText,
  mutateCurrentTodoItems,
  currentTodoItemEditIdRef,
}: TodoItemProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [isChecked, setIsChecked] = useState(isDone);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };
  const toggleCheckbox = (id: string, isDone: boolean) => {
    // toggle current todo item checkbox
    mutateCurrentTodoItems({
      name: "TOGGLE_DONE",
      value: { id, isDone },
    });
  };
  const setEditText = () => {
    // reference current todo item id for edit
    currentTodoItemEditIdRef.current = id;
    // set todo text to edit
    setTodoText(text);
  };
  const deleteItem = () => {
    mutateCurrentTodoItems({
      name: "REMOVE_ITEM",
      value: id,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // biome-ignore lint/correctness/useExhaustiveDependencies: not needed
  useEffect(() => {
    toggleCheckbox(id, isChecked);
  }, [isChecked]);

  return (
    <Pressable onLongPress={toggleOptions}>
      <View style={[styles.container, showOptions ? styles.target : undefined]}>
        {showOptions && <OptionsOverlay {...{ deleteItem, setEditText }} />}
        <Text>{serialNumber}.</Text>
        <Checkbox value={isChecked} onValueChange={setIsChecked} />
        <Text style={[isChecked ? styles.todoText : undefined]}>{text}</Text>
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
