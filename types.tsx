import type {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import type { Dispatch, SetStateAction } from "react";

export type TodoItemData = {
  id: number;
  isDone: boolean;
  text: string;
};

export type TodoItemProps = {
  text: string;
  id: number;
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

export type Todo = {
  title: string;
  description?: string;
  todoItems: TodoItemData[];
  createdAt: string;
  updatedAt: string;
};

export type TodoReducerAction = {
  type: keyof TodoActionTemplate;
  index: number;
  value: string | TodoItemData[];
};
/**
 * TODO: function to update all fields in `Todo` type
 */
export type TodoActionTemplate = {
  setTitle: (todos: Todo[], action: TodoReducerAction) => Todo[];
  setDescription: (todos: Todo[], action: TodoReducerAction) => Todo[];
  setTodoItems: (todos: Todo[], action: TodoReducerAction) => Todo[];
  setCreatedAt: (todos: Todo[], action: TodoReducerAction) => Todo[];
  setUpdatedAt: (todos: Todo[], action: TodoReducerAction) => Todo[];
};

export type TodosContextValue = {
  todos: Todo[];
  mutateTodos: Dispatch<TodoReducerAction>;
};
