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
  setTodos: (value: React.SetStateAction<TodoItemData[]>) => void;
  todos: TodoItemData[];
  text: string;
  index: number;
  isDone: boolean;
  serialNumber: number;
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
