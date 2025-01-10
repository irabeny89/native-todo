import type { Todo, TodoItemData } from "@/hooks/usePersistTodo";
import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useReducer,
  useRef,
  useState,
} from "react";

type TodoContextValue = {
  currentTitle: string;
  setCurrentTitle: Dispatch<SetStateAction<string>>;
  currentDescription: string;
  setCurrentDescription: Dispatch<SetStateAction<string>>;
  currentTodoItems: TodoItemData[];
  mutateCurrentTodoItems: Dispatch<TodoItemAction>;
  storedTodos: Todo[];
  setStoredTodos: Dispatch<SetStateAction<Todo[]>>;
};

type TodoItemAddAction = {
  name: "ADD";
  value: TodoItemData;
};
type TodoItemToggleDoneAction = {
  name: "TOGGLE_DONE";
  /** item id */
  value: { id: string; isDone: boolean };
};
export type TodoItemUpdateTextAction = {
  name: "UPDATE_TEXT";
  value: Record<"id" | "text", string>;
};
export type TodoItemRemoveItemAction = {
  name: "REMOVE_ITEM";
  /** item id */
  value: string;
};
type TodoItemClearAction = {
  name: "CLEAR";
};
type TodoItemSetDefaultAction = {
  name: "SET_DEFAULT";
  value: TodoItemData[];
};
export type TodoItemAction =
  | TodoItemAddAction
  | TodoItemToggleDoneAction
  | TodoItemUpdateTextAction
  | TodoItemRemoveItemAction
  | TodoItemClearAction
  | TodoItemSetDefaultAction;

const todoItemsReducer = (
  state: TodoItemData[],
  action: TodoItemAction,
): TodoItemData[] => {
  let newState = state;
  if (action.name === "ADD") {
    newState = [action.value, ...state];
  } else if (action.name === "TOGGLE_DONE") {
    newState = state.map((item) =>
      item.id === action.value.id
        ? { ...item, isDone: action.value.isDone }
        : item,
    );
  } else if (action.name === "UPDATE_TEXT") {
    newState = state.map((item) =>
      item.id === action.value.id ? { ...item, text: action.value.text } : item,
    );
  } else if (action.name === "REMOVE_ITEM") {
    newState = state.filter((item) => item.id !== action.value);
  } else if (action.name === "CLEAR") {
    newState = [];
  } else if (action.name === "SET_DEFAULT") {
    newState = action.value;
  }
  return newState;
};

export const TodoContext = createContext<TodoContextValue | null>(null);

export default function TodoContextProvider({ children }: PropsWithChildren) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentTodoItems, mutateCurrentTodoItems] = useReducer(
    todoItemsReducer,
    [],
  );
  const [storedTodos, setStoredTodos] = useState<Todo[]>([]);

  return (
    <TodoContext.Provider
      value={{
        currentTitle,
        setCurrentTitle,
        currentDescription,
        setCurrentDescription,
        currentTodoItems,
        mutateCurrentTodoItems,
        storedTodos,
        setStoredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
