import { Pressable, StyleSheet, View } from "react-native";
import UpdateBtn from "./updateTodoBtn";
import DeleteBtn from "./DeleteTodoBtn";
import { Fragment, useState } from "react";
import { Entypo } from "@expo/vector-icons";

export default function MutateAction() {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <Fragment>
      <Pressable
        onPress={() => setShowOptions(!showOptions)}
        style={styles.menuIcon}
      >
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </Pressable>
      {showOptions && (
        <View style={styles.actionCta}>
          <View>
            <DeleteBtn />
          </View>
          <View>
            <UpdateBtn />
          </View>
        </View>
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    marginBottom: 10, // Adds some space between the menu and the buttons
  },
  actionCta: {
    position: "absolute",
    flexDirection: "column",
    gap: 20,
    top: 30,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
