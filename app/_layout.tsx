import TodosContextProvider from "@/components/TodosContextProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TodosContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="add_todo"
          options={{ headerBackVisible: true, title: "" }}
        />
      </Stack>
    </TodosContextProvider>
  );
}
