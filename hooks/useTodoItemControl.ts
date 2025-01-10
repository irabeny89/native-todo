import { TodoContext } from "@/components/TodoContextProvider";
import { useContext, useRef, useState } from "react";
import type {
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";

export default function useTodoItemControl() {
  const [todoText, setTodoText] = useState("");
  const todoCtx = useContext(TodoContext);
  const currentTodoItemEditIdRef = useRef("");

  /**
   * Handles submit event on todo item text input
   * @param e submit event
   */
  const handleTodoItemSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    if (todoText && todoCtx) {
      if (currentTodoItemEditIdRef.current) {
        // update todo item text
        todoCtx.mutateCurrentTodoItems({
          name: "UPDATE_TEXT",
          value: { id: currentTodoItemEditIdRef.current, text: todoText },
        });
        // clear current todo item edit id
        currentTodoItemEditIdRef.current = "";
      } else
        // add todo item to current todo
        todoCtx.mutateCurrentTodoItems({
          name: "ADD",
          value: {
            id: Date.now().toString(),
            isDone: false,
            text: todoText,
          },
        });
      // clear todo text input
      setTodoText("");
    }
  };

  return {
    todoCtx,
    todoText,
    setTodoText,
    handleTodoItemSubmit,
    currentTodoItemEditIdRef,
  };
}
