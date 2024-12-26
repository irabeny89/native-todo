import { useContext } from "react";
import { TodoContext } from "./TodoContextProvider";
import UpdateBtn from "./updateTodoBtn";
import SaveBtn from "./SaveTodoBtn";

export default function SaveOrUpdateBtn() {
  const todoCtx = useContext(TodoContext);

  if (todoCtx?.title && !todoCtx?.editableTodoId) return <SaveBtn />;
  if (todoCtx?.editableTodoId) return <UpdateBtn />;
  return null;
}
