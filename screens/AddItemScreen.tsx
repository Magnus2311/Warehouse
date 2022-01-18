import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import { Text, View, Separator, Input } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"AddItemScreen">) {
  const [text, changeText] = useState("");
  const [number, changeNumber] = useState("");

  const onChangeText = (text: string) => changeText(text);
  const onChangeNumber = (text: string) => changeNumber(text);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new item</Text>
      <Separator />
      <Input onChangeText={onChangeText} value={text} />
      <Input
        onChangeText={changeNumber}
        value={number}
        keyboardType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
