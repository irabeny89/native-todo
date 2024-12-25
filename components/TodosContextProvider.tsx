import type {
  Todo,
  TodoActionTemplate,
  TodoItemData,
  TodoReducerAction,
  TodosContextValue,
} from "@/types";
import { createContext, useReducer, type PropsWithChildren } from "react";

const updateTitle =
  (action: TodoReducerAction) => (todo: Todo, index: number) =>
    index === action.index ? { ...todo, title: action.value as string } : todo;

const updateDescription =
  (action: TodoReducerAction) => (todo: Todo, index: number) =>
    index === action.index
      ? { ...todo, description: action.value as string }
      : todo;

const updateTodoItems =
  (action: TodoReducerAction) => (todo: Todo, index: number) =>
    index === action.index
      ? { ...todo, todoItems: action.value as TodoItemData[] }
      : todo;

const updateCreatedAt =
  (action: TodoReducerAction) => (todo: Todo, index: number) =>
    index === action.index
      ? { ...todo, createdAt: action.value as string }
      : todo;

const updateUpdatedAt =
  (action: TodoReducerAction) => (todo: Todo, index: number) =>
    index === action.index
      ? { ...todo, updatedAt: action.value as string }
      : todo;

const actionTemplates: TodoActionTemplate = {
  setTitle: (todos: Todo[], action: TodoReducerAction) =>
    todos.map(updateTitle(action)),
  setDescription: (todos: Todo[], action: TodoReducerAction) =>
    todos.map(updateDescription(action)),
  setTodoItems: (todos: Todo[], action: TodoReducerAction) =>
    todos.map(updateTodoItems(action)),
  setCreatedAt: (todos: Todo[], action: TodoReducerAction) =>
    todos.map(updateCreatedAt(action)),
  setUpdatedAt: (todos: Todo[], action: TodoReducerAction) =>
    todos.map(updateUpdatedAt(action)),
};

const todosReducer = (todos: Todo[], action: TodoReducerAction): Todo[] =>
  action.type === "setTodoItems"
    ? actionTemplates.setTodoItems(todos, action)
    : actionTemplates[action.type](todos, action);

export const TodosContext = createContext<TodosContextValue | null>(null);

export default function TodosContextProvider({ children }: PropsWithChildren) {
  const [todos, mutateTodos] = useReducer(todosReducer, []);

  return (
    <TodosContext.Provider value={{ todos, mutateTodos }}>
      {children}
    </TodosContext.Provider>
  );
}
