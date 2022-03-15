import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../components/Page";
import { Button, Input } from "../components/Themed";
import { Item } from "../helpers/models";
import { actionCreators } from "../redux/itemActions";
import { actionCreators as modalActionCreators } from "../redux/modalActions";
import { AppState } from "../redux/store";

interface Props {
  itemId?: string;
  items: Item[];
  onItemAdded: (item: Item) => void;
  onItemEdited: (item: Item) => void;
  onModalTitleChanged: (title: string) => void;
}

const emptyItem = {
  name: "",
  basePrice: "",
  sellPrice: "",
} as Item;

const AddItemScreen: FunctionComponent<Props> = ({
  itemId,
  items,
  onItemAdded,
  onModalTitleChanged,
  onItemEdited,
}) => {
  const currentItem = items.find(i => i.id === itemId);
  const [item, setItem] = useState(currentItem ?? emptyItem);
  const navigator = useNavigation();
  if (currentItem) {
    onModalTitleChanged("Редакция на стока");
  } else {
    onModalTitleChanged("Добавяне на стока");
  }

  const onTextChange = (name: string, value: string) => {
    setItem({
      ...item,
      [name]: value,
    });
  };

  return (
    <Page>
      <Input
        label="Име на стоката:"
        onChangeText={txt => onTextChange("name", txt)}
        value={item.name}
      />
      <Input
        label="Доставна цена:"
        onChangeText={txt => onTextChange("basePrice", txt)}
        value={item.basePrice.toString()}
        keyboardType="numeric"
      />
      <Input
        label="Продажна цена:"
        onChangeText={txt => onTextChange("sellPrice", txt)}
        value={item.sellPrice.toString()}
        keyboardType="numeric"
      />
      <Button
        label={currentItem ? "Редакция на стока" : "Добавяне на стока"}
        onPress={() => {
          currentItem ? onItemEdited(item) : onItemAdded(item);
          setItem(emptyItem);
          navigator.navigate("Root");
        }}
      />
    </Page>
  );
};

const mapStateToProps = (state: AppState) => state.items;

const mapDispatchToProps = (dispatch: any) => {
  return {
    onItemAdded: (item: Item) => {
      dispatch(actionCreators.onAddItem(item));
    },
    onItemEdited: (item: Item) => {
      dispatch(actionCreators.onEditItem(item));
    },
    onModalTitleChanged: (modalTitle: string) => {
      dispatch(modalActionCreators.onTitleChange(modalTitle));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemScreen);
