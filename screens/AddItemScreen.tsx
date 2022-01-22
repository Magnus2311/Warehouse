import React, { useState } from "react";
import { Page } from "../components/Page";

import { LabeledInput, Button } from "../components/Themed";
import { Item } from "../helpers/models";
import { actionCreators } from "../redux/itemActions";
import { RootTabScreenProps } from "../types";

export default function AddItemScreen({
  navigation,
}: RootTabScreenProps<"AddItemScreen">) {
  const [item, setItem] = useState({
    name: "",
    basePrice: "",
    sellPrice: "",
  } as Item);

  const onTextChange = (name: string, value: string) => {
    setItem({
      ...item,
      [name]: value,
    });
  };

  return (
    <Page title="Add an item">
      <LabeledInput
        label="Име на стоката:"
        onChangeText={(txt) => onTextChange("name", txt)}
        value={item.name}
      />
      <LabeledInput
        label="Доставна цена:"
        onChangeText={(txt) => onTextChange("basePrice", txt)}
        value={item.basePrice}
        keyboardType="numeric"
      />
      <LabeledInput
        label="Продажна цена:"
        onChangeText={(txt) => onTextChange("sellPrice", txt)}
        value={item.sellPrice}
        keyboardType="numeric"
      />
      <Button
        label="Добавяне на стока"
        onPress={() => actionCreators.onAddItem(item)}
      />
    </Page>
  );
}
