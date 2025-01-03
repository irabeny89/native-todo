import {
  TodoContext,
  type TodoItemData,
} from "@/components/TodoContextProvider";
import { useContext, useRef, useState } from "react";

export default function useTodoControl() {
  const [todoText, setTodoText] = useState("");
  const todoCtx = useContext(TodoContext);
  const editTodoItemIdRef = useRef("");

  /**
   * Handles submit event on todo text input
   * @param e submit event
   */
  const handleSubmit = () => {
    if (todoText && todoCtx) {
      const { setCurrentTodoItems } = todoCtx;
      setCurrentTodoItems((items) => {
        let updatedItems: TodoItemData[];
        // update editable todo item if in edit mode
        if (editTodoItemIdRef.current) {
          updatedItems = items.map((item) =>
            item.id === editTodoItemIdRef.current
              ? { ...item, text: todoText }
              : item,
          );
          // clear edit mode
          editTodoItemIdRef.current = "";
        } else
          // add new todo item to local state
          updatedItems = [
            {
              // compute index from prev items
              id: Date.now().toString(),
              text: todoText,
              isDone: false,
            },
            ...items,
          ];
        return updatedItems;
      });
      // clear todo text input
      setTodoText("");
    }
  };

  return {
    todoCtx,
    todoText,
    setTodoText,
    handleSubmit,
    editTodoItemIdRef,
  };
}
