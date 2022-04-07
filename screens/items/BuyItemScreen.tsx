import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../../components/Page";
import { Button, Input, Text } from "../../components/Themed";
import { toDecimalFormat } from "../../helpers/extensions";
import { BuyItem, Item } from "../../helpers/models";
import { actionCreators } from "../../redux/modalActions";
import { actionCreators as itemsActions } from "../../redux/itemActions";

type Props = {
  item: Item;
  onModalTitleChanged: (modalTitle: string) => void;
  onBuyItem: (buyItem: BuyItem) => void;
};

const BuyItemScreen: FunctionComponent<Props> = ({
  item,
  onModalTitleChanged,
  onBuyItem,
}) => {
  const [currentItem, setItem] = useState({ ...item, qtty: "1" });
  const onTextChange = (name: string, value: string) => {
    setItem({
      ...currentItem,
      [name]: value,
    });
  };
  const navigator = useNavigation();

  useEffect(() => onModalTitleChanged("Покупка на стока"));

  return (
    <Page>
      <Input label="Име на стоката:" value={currentItem.name} border={true} />
      <Input
        label="Доставна цена:"
        onChangeText={txt => onTextChange("basePrice", txt)}
        value={currentItem.basePrice}
        keyboardType="numeric"
        border={true}
      />
      <Input
        label="Количество:"
        onChangeText={txt => onTextChange("qtty", txt)}
        value={currentItem.qtty}
        keyboardType="numeric"
        border={true}
      />
      <Input
        label="Продажна цена:"
        value={currentItem.sellPrice}
        keyboardType="numeric"
        border={true}
      />
      <Text
        style={{
          margin: 0,
        }}
      >
        Сума за покупка:{" "}
        {toDecimalFormat(
          Number(currentItem.qtty) * Number(currentItem.basePrice)
        )}
      </Text>
      <Button
        label={"Завършване на покупка"}
        onPress={() => {
          onBuyItem({
            qtty: currentItem.qtty,
            basePrice: currentItem.basePrice,
            itemId: currentItem.id,
          });
          navigator.goBack();
        }}
      />
    </Page>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onModalTitleChanged: (modalTitle: string) => {
      dispatch(actionCreators.onTitleChange(modalTitle));
    },
    onBuyItem: (buyItem: BuyItem) => {
      dispatch(itemsActions.onBuyItem(buyItem));
    },
  };
};

export default connect(null, mapDispatchToProps)(BuyItemScreen);
