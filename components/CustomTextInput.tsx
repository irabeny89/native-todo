import type { Dispatch, SetStateAction } from "react";
import {
	type NativeSyntheticEvent,
	StyleSheet,
	Text,
	TextInput,
	type TextInputKeyPressEventData,
	type TextInputSubmitEditingEventData,
	View,
} from "react-native";

type CustomInputProps = {
	name?: string;
	value: string;
	onChangeText: Dispatch<SetStateAction<string>>;
	onSubmitEditing?:
		| ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
		| undefined;
	placeholder?: string;
	placeholderTextColor?: string;
	style?: object;
};

export default function CustomTextInput({
	name,
	onChangeText,
	onSubmitEditing,
	value,
	placeholder,
	placeholderTextColor = "gray",
	style = {},
}: CustomInputProps) {
	return (
		<View style={styles.container}>
			<View style={styles.nameBg}>
				<Text style={styles.name}>{name}</Text>
			</View>
			<TextInput
				style={{ ...styles.input, ...style }}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				onSubmitEditing={onSubmitEditing}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
	nameBg: {
		position: "absolute",
		top: -10,
		left: 8,
		padding: 4,
		backgroundColor: "white",
	},
	name: {
		fontSize: 10,
	},
	input: {
		width: "100%",
		borderColor: "gray",
		borderStyle: "solid",
		borderWidth: 2,
		borderRadius: 6,
		padding: 5,
	},
});
