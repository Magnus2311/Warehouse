import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import Dropdown from "../../components/dropdowns/Dropdown";
import { Page } from "../../components/Page";
import { Button, Input } from "../../components/Themed";
import { Item, Partner } from "../../helpers/models";
import { actionCreators } from "../../redux/itemActions";
import { actionCreators as modalActionCreators } from "../../redux/modalActions";
import { AppState } from "../../redux/store";

interface Props {
  itemId?: string;
  items: Item[];
  partners: Partner[];
  onItemAdded: (item: Item) => void;
  onItemEdited: (item: Item) => void;
  onModalTitleChanged: (title: string) => void;
}

const emptyItem = {
  name: "",
  basePrice: "",
  sellPrice: "",
  partnerId: "",
  qtty: "",
} as Item;

const AddItemScreen: FunctionComponent<Props> = ({
  itemId,
  items,
  partners,
  onItemAdded,
  onModalTitleChanged,
  onItemEdited,
}) => {
  const currentItem = items.find((i) => i.id === itemId);
  const [item, setItem] = useState(currentItem ?? emptyItem);
  const navigator = useNavigation();

  const [selectableItems] = useState(
    partners.map((partner) => ({
      id: partner.id,
      title: partner.name,
    }))
  );

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

  const handlePartnerSelect = (partnerId: string) => {
    setItem({ ...item, partnerId });
  };

  return (
    <Page>
      <Input
        label="Име на стоката:"
        onChangeText={(txt) => onTextChange("name", txt)}
        value={item.name}
        border={true}
      />
      <Dropdown
        placeholder="Въведете име на доставчик"
        selectedItem={
          currentItem
            ? {
                id: currentItem.partnerId,
                title:
                  partners.find(
                    (partner) => partner.id === currentItem.partnerId
                  )?.name ?? "",
              }
            : undefined
        }
        items={selectableItems}
        handleItemChosen={handlePartnerSelect}
        label="Име на доставчик"
        border={true}
        style={{ marginBottom: 15 }}
      />
      {!currentItem && (
        <Input
          label="Доставна цена:"
          onChangeText={(txt) => onTextChange("basePrice", txt)}
          value={item.basePrice.toString()}
          keyboardType="numeric"
          border={true}
        />
      )}
      {!currentItem && (
        <Input
          label="Количество:"
          onChangeText={(txt) => onTextChange("qtty", txt)}
          value={item.qtty}
          keyboardType="numeric"
          border={true}
        />
      )}
      <Input
        label="Продажна цена:"
        onChangeText={(txt) => onTextChange("sellPrice", txt)}
        value={item.sellPrice.toString()}
        keyboardType="numeric"
        border={true}
      />
      <Button
        label={currentItem ? "Редакция на стока" : "Добавяне на стока"}
        onPress={() => {
          currentItem ? onItemEdited(item) : onItemAdded(item);
          setItem(emptyItem);
          navigator.navigate("ItemsListScreen");
        }}
      />
    </Page>
  );
};

const mapStateToProps = (state: AppState) => ({
  items: state.items!.items,
  partners: state.partners!.partners,
});

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
