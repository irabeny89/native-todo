import SaveBtn from "@/components/SaveTodoBtn";
import { Stack } from "expo-router";

export default function TodoLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="new"
        options={{
          title: "New Entry",
          headerRight: SaveBtn,
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
