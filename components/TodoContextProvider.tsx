import type { TodoItemData } from "@/app/add_todo";
import {
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	createContext,
	useReducer,
	useState,
} from "react";

type TodoContextValue = {
	todoStore: Todo[];
	mutateTodoStore: Dispatch<TodoReducerAction>;
	todoItems: TodoItemData[];
	setTodoItems: Dispatch<SetStateAction<TodoItemData[]>>;
	title: string;
	setTitle: Dispatch<SetStateAction<string>>;
	description: string;
	setDescription: Dispatch<SetStateAction<string>>;
	editableTodoItemId: string;
	setEditableTodoItemId: Dispatch<SetStateAction<string>>;
	editableTodoId: string;
	setEditableTodoId: Dispatch<SetStateAction<string>>;
};
type TodoActionTemplate = {
	setTitle: (todos: Todo[], action: TodoReducerAction) => Todo[];
	setDescription: (todos: Todo[], action: TodoReducerAction) => Todo[];
	setTodoItems: (todos: Todo[], action: TodoReducerAction) => Todo[];
	setCreatedAt: (todos: Todo[], action: TodoReducerAction) => Todo[];
	setUpdatedAt: (todos: Todo[], action: TodoReducerAction) => Todo[];
	save: (todos: Todo[], action: TodoReducerAction) => Todo[];
	update: (todos: Todo[], action: TodoReducerAction) => Todo[];
};
type TodoReducerAction = {
	/** Type of action to perform. */
	type: keyof TodoActionTemplate;
	/** Id of the data to mutate(e.g Update). This can be undefined for new data eg `Save` unlike `Update`action where it is required! */
	id?: string;
	/** Data value to store. */
	value: string | TodoItemData[] | Todo;
};
type Todo = {
	id: string;
	title: string;
	description?: string;
	todoItems: TodoItemData[];
	createdAt: string;
	updatedAt: string;
};

const updateTitle =
	(action: TodoReducerAction) => (todo: Todo, index: number) =>
		todo.id === action.id ? { ...todo, title: action.value as string } : todo;

const updateDescription =
	(action: TodoReducerAction) => (todo: Todo, index: number) =>
		todo.id === action.id
			? { ...todo, description: action.value as string }
			: todo;

const updateTodoItems =
	(action: TodoReducerAction) => (todo: Todo, index: number) =>
		todo.id === action.id
			? { ...todo, todoItems: action.value as TodoItemData[] }
			: todo;

const updateCreatedAt =
	(action: TodoReducerAction) => (todo: Todo, index: number) =>
		todo.id === action.id
			? { ...todo, createdAt: action.value as string }
			: todo;

const updateUpdatedAt =
	(action: TodoReducerAction) => (todo: Todo, index: number) =>
		todo.id === action.id
			? { ...todo, updatedAt: action.value as string }
			: todo;

const updateTodo = (action: TodoReducerAction) => (todo: Todo, index: number) =>
	todo.id === action.id ? (action.value as Todo) : todo;

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
	save: (todos: Todo[], action: TodoReducerAction) =>
		todos.concat(action.value as Todo),
	update: (todos: Todo[], action: TodoReducerAction) =>
		todos.map(updateTodo(action)),
};

const todosReducer = (todos: Todo[], action: TodoReducerAction): Todo[] =>
	action.type === "setTodoItems"
		? // handle array action value type
			actionTemplates.setTodoItems(todos, action)
		: action.type === "save"
			? // handle object action value type
				actionTemplates.save(todos, action)
			: // handle string action value type
				actionTemplates[action.type](todos, action);

export const TodoContext = createContext<TodoContextValue | null>(null);

export default function TodoContextProvider({ children }: PropsWithChildren) {
	const [todoStore, mutateTodoStore] = useReducer(todosReducer, []);
	const [todoItems, setTodoItems] = useState<TodoItemData[]>([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [editableTodoItemId, setEditableTodoItemId] = useState<string>("");
	const [editableTodoId, setEditableTodoId] = useState<string>("");

	return (
		<TodoContext.Provider
			value={{
				todoStore,
				mutateTodoStore,
				todoItems,
				setTodoItems,
				title,
				setTitle,
				description,
				setDescription,
				editableTodoItemId,
				setEditableTodoItemId,
				editableTodoId,
				setEditableTodoId,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
}
