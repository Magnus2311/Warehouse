import { useState } from "react";
import { StyleSheet } from "react-native";

import {
  Text,
  Separator,
  LabeledInput,
  PageContainer,
} from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"AddItemScreen">) {
  const [text, changeText] = useState("");
  const [number, changeNumber] = useState("");

  const onChangeText = (text: string) => changeText(text);
  const onChangeNumber = (text: string) => changeNumber(text);

  return (
    <PageContainer style={styles.container}>
      <Text style={styles.title}>Add new item</Text>
      <Separator />
      <LabeledInput
        label="Име на стоката:"
        onChangeText={onChangeText}
        value={text}
      />
      <LabeledInput
        label="Цена на стоката: "
        onChangeText={changeNumber}
        value={number}
        keyboardType="numeric"
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
