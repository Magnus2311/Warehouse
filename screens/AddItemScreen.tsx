import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../components/Page";

import { LabeledInput, Button } from "../components/Themed";
import { Item } from "../helpers/models";
import { actionCreators } from "../redux/itemActions";
import { AppState } from "../redux/store";
import { RootTabScreenProps } from "../types";

interface Props {
  onItemAdded: (item: Item) => void;
}

const emptyItem = {
  name: "",
  basePrice: "",
  sellPrice: "",
} as Item;

const AddItemScreen: FunctionComponent<Props> = ({ onItemAdded }) => {
  const [item, setItem] = useState(emptyItem);

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
        onPress={() => {
          onItemAdded(item);
          setItem(emptyItem);
        }}
      />
    </Page>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onItemAdded: (item: Item) => {
      dispatch(actionCreators.onAddItem(item));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddItemScreen);
