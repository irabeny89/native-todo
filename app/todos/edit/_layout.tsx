import MutateAction from "@/components/MutateAction";
import { Stack } from "expo-router";

export default function TodoLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Edit Entry",
          headerRight: MutateAction,
        }}
      />
    </Stack>
  );
}
