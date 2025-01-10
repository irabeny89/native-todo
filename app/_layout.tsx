import TodosContextProvider from "@/components/TodoContextProvider";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <TodosContextProvider>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "TodoSync v1",
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
