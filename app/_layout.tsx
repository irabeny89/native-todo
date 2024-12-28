import MutateAction from "@/components/MutateAction";
import TodosContextProvider from "@/components/TodoContextProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TodosContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="add_todo"
          options={{
            headerBackVisible: true,
            title: "",
            headerRight: MutateAction,
          }}
        />
      </Stack>
    </TodosContextProvider>
  );
}
