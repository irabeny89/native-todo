import type {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import type { Dispatch, SetStateAction } from "react";

export type TodoItemData = {
  index: number;
  isDone: boolean;
  text: string;
};

export type TodoItemProps = {
  text: string;
  index: number;
  isDone: boolean;
  serialNumber: number;
  editableTodo: TodoItemData | null;
  todos: TodoItemData[];
  setTodoText: Dispatch<SetStateAction<string>>;
  setTodos: (value: SetStateAction<TodoItemData[]>) => void;
  setEditableTodo: React.Dispatch<React.SetStateAction<TodoItemData | null>>;
};

export type CustomInputProps = {
  name?: string;
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: object;
};

export type DividerProps = {
  axis?: "x" | "y";
};
