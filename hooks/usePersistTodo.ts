import { TODO_STORE_KEY } from "@/constants";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export type TodoItemData = {
  id: string;
  isDone: boolean;
  text: string;
};
export type Todo = {
  id: string;
  title: string;
  description?: string;
  todoItems: TodoItemData[];
  createdAt: string;
  updatedAt: string;
};

export default function usePersistTodo(key: string) {
  const { mergeItem, setItem, getItem } = useAsyncStorage(TODO_STORE_KEY);

  const getStoredTodos = async () =>
    JSON.parse((await getItem()) ?? "[]") as Todo[];
  const persistTodo = async (newData: Todo) => {
    const old = await getStoredTodos();
    const updatedTodos = [newData, ...old];
    await setItem(JSON.stringify(updatedTodos));
    return updatedTodos;
  };
  const updateTodo = async (updatedData: Todo) => {
    const old = await getStoredTodos();
    const updatedTodos = [
      updatedData,
      ...old.filter((d) => d.id !== updatedData.id),
    ];
    await setItem(JSON.stringify(updatedTodos));
    return updatedTodos;
  };
  const deleteTodo = async (id: string) => {
    const old = await getStoredTodos();
    const updatedTodos = old.filter((d) => d.id !== id);
    await setItem(JSON.stringify(updatedTodos));
    return updatedTodos;
  };

  return {
    getStoredTodos,
    persistTodo,
    updateTodo,
    deleteTodo,
    mergeItem,
    setItem,
    getItem,
  };
}
