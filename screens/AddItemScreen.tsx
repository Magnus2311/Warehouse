import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../components/Page";

import { LabeledInput, Button } from "../components/Themed";
import { Item } from "../helpers/models";
import { actionCreators } from "../redux/itemActions";
import * as modalActionCreators from "../redux/modalActions";

interface Props {
  onItemAdded: (item: Item) => void;
  onModalTitleChanged: (title: string) => void;
}

const emptyItem = {
  name: "",
  basePrice: "",
  sellPrice: "",
} as Item;

const AddItemScreen: FunctionComponent<Props> = ({
  onItemAdded,
  onModalTitleChanged,
}) => {
  const [item, setItem] = useState(emptyItem);
  const navigator = useNavigation();

  useEffect(() => {
    onModalTitleChanged("Добавяне на стока");
  });

  const onTextChange = (name: string, value: string) => {
    setItem({
      ...item,
      [name]: value,
    });
  };

  return (
    <Page>
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
          navigator.navigate("Root");
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
    onModalTitleChanged: (modalTitle: string) => {
      dispatch(modalActionCreators.actionCreators.onTitleChange(modalTitle));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(AddItemScreen);
