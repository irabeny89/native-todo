import { Stack } from "expo-router";

export default function TodoLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="new"
        options={{
          title: "New Entry",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Edit Entry",
        }}
      />
    </Stack>
  );
}
