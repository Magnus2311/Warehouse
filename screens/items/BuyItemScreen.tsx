import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../../components/Page";
import { Button, Input, Text } from "../../components/Themed";
import { toDecimalFormat } from "../../helpers/extensions";
import { Item } from "../../helpers/models";
import { actionCreators } from "../../redux/modalActions";

type Props = {
  item: Item;
  onModalTitleChanged: (modalTitle: string) => void;
};

const BuyItemScreen: FunctionComponent<Props> = ({
  item,
  onModalTitleChanged,
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
        value={currentItem.basePrice.toString()}
        keyboardType="numeric"
        border={true}
      />
      <Input
        label="Количество:"
        onChangeText={(txt) => onTextChange("qtty", txt)}
        value={currentItem.qtty}
        keyboardType="numeric"
        border={true}
      />
      <Input
        label="Продажна цена:"
        value={currentItem.sellPrice.toString()}
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
  };
};

export default connect(null, mapDispatchToProps)(BuyItemScreen);
