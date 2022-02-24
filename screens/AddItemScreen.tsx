import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../components/Page";

import { LabeledInput, Button } from "../components/Themed";
import { Item } from "../helpers/models";
import { actionCreators } from "../redux/itemActions";
import { RootStackParamList } from "../types";

interface Props {
  onItemAdded: (item: Item) => void;
  onClose: () => void;
  props: NativeStackScreenProps<RootStackParamList>;
}

const emptyItem = {
  name: "",
  basePrice: "",
  sellPrice: "",
} as Item;

const AddItemScreen: FunctionComponent<Props> = ({
  onItemAdded,
  onClose,
  props,
}) => {
  const [item, setItem] = useState(emptyItem);
  const { navigation } = props;

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
          onClose();
          navigation.goBack();
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
