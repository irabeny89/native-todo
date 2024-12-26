import { useRouter } from "expo-router";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TodoContext } from "./TodoContextProvider";

export default function UpdateBtn() {
	const todoCtx = useContext(TodoContext);
	const router = useRouter();

	const handleUpdate = () => {
		if (todoCtx) {
			const {
				title,
				description,
				todoItems,
				mutateTodoStore,
				editableTodoId,
				setTitle,
				setDescription,
				setTodoItems,
				setEditableTodoId,
			} = todoCtx;
			mutateTodoStore({
				type: "update",
				id: editableTodoId,
				value: {
					id: new Date().toString(),
					title,
					description,
					todoItems,
					createdAt: new Date().toLocaleDateString(),
					updatedAt: new Date().toLocaleDateString(),
				},
			});
			// clear edit mode
			setEditableTodoId("");
			// clear inputs
			setTitle("");
			setDescription("");
			setTodoItems([]);
			// back to home screen
			router.dismissTo("/");
		}
	};
	return (
		<View style={styles.container}>
			<Pressable onPress={handleUpdate}>
				<Text>Update</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginRight: 10,
	},
});
