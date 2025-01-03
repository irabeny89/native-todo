import AddTodoBtn from "@/components/AddTodoBtn";
import MutateAction from "@/components/MutateAction";
import TodosContextProvider from "@/components/TodoContextProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TodosContextProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "TodoSync v1",
            headerRight: AddTodoBtn,
          }}
        />
        <Stack.Screen
          name="todos"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </TodosContextProvider>
  );
}
