import {
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useReducer,
  useState,
} from "react";

export type TodoItemData = {
  id: string;
  isDone: boolean;
  text: string;
};
type TodoReducerAction = {
  /** Type of action to perform. */
  type: keyof TodoActionTemplate;
  /** Id of the data to mutate(e.g Update). This can be undefined for new data eg `Save` unlike `Update`action where it is required! */
  id?: string;
  /** Data value to store. */
  value?: string | TodoItemData[] | Todo;
};
export type Todo = {
  id: string;
  title: string;
  description?: string;
  todoItems: TodoItemData[];
  createdAt: string;
  updatedAt: string;
};
type TodoContextValue = {
  todoStore: Todo[];
  mutateTodoStore: Dispatch<TodoReducerAction>;
  currentTitle: string;
  setCurrentTitle: Dispatch<SetStateAction<string>>;
  currentDescription: string;
  setCurrentDescription: Dispatch<SetStateAction<string>>;
  currentTodoItems: TodoItemData[];
  setCurrentTodoItems: Dispatch<SetStateAction<TodoItemData[]>>;
};
type TodoActionTemplate = {
  save: (todos: Todo[], action: TodoReducerAction) => Todo[];
  update: (todos: Todo[], action: TodoReducerAction) => Todo[];
  delete: (todos: Todo[], action: TodoReducerAction) => Todo[];
};

const updateTodo =
  (action: TodoReducerAction) => (todo: Todo, index: number) =>
    todo.id === action.id ? (action.value as Todo) : todo;

const removeTodo = (action: TodoReducerAction) => (todo: Todo, index: number) =>
  todo.id !== action.id;

const actionTemplates: TodoActionTemplate = {
  /** Save a new todo group. Only the todo group data is required. */
  save: (todos: Todo[], action: TodoReducerAction) =>
    todos.concat(action.value as Todo),
  /** Replace an existing todo group with another todo group object. The id and new todo group data should be provided in action object. */
  update: (todos: Todo[], action: TodoReducerAction) =>
    todos.map(updateTodo(action)),
  /** Delete/remove a todo group from stored todo groups. The only expected action is the main todo id. */
  delete: (todos: Todo[], action: TodoReducerAction) =>
    todos.filter(removeTodo(action)),
};

const todosReducer = (todos: Todo[], action: TodoReducerAction): Todo[] =>
  actionTemplates[action.type](todos, action);

export const TodoContext = createContext<TodoContextValue | null>(null);

export default function TodoContextProvider({ children }: PropsWithChildren) {
  const [todoStore, mutateTodoStore] = useReducer(todosReducer, []);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentTodoItems, setCurrentTodoItems] = useState<TodoItemData[]>([]);

  return (
    <TodoContext.Provider
      value={{
        todoStore,
        mutateTodoStore,
        currentTitle,
        setCurrentTitle,
        currentDescription,
        setCurrentDescription,
        currentTodoItems,
        setCurrentTodoItems,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
