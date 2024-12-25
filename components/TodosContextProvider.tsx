import type { TodoItemData } from "@/app/add_todo";
import {
  createContext,
  type Dispatch,
  useReducer,
  type PropsWithChildren,
} from "react";

type TodosContextValue = {
  todos: Todo[];
  mutateTodos: Dispatch<TodoReducerAction>;
};
type TodoActionTemplate = {
  setTitle: (todos: Todo[], action: TodoReducerAction) => Todo[];
  setDescription: (todos: Todo[], action: TodoReducerAction) => Todo[];
  setTodoItems: (todos: Todo[], action: TodoReducerAction) => Todo[];
  setCreatedAt: (todos: Todo[], action: TodoReducerAction) => Todo[];
  setUpdatedAt: (todos: Todo[], action: TodoReducerAction) => Todo[];
};
type TodoReducerAction = {
  type: keyof TodoActionTemplate;
  index: number;
  value: string | TodoItemData[];
};
type Todo = {
  title: string;
  description?: string;
  todoItems: TodoItemData[];
  createdAt: string;
  updatedAt: string;
};

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
