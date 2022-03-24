import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../../components/Page";
import { Button, View } from "../../components/Themed";
import { Item, Partner, Sale } from "../../helpers/models";
import { actionCreators as salesActions } from "../../redux/salesActions";
import { actionCreators as partnersActions } from "../../redux/partnerActions";
import { actionCreators as modalActions } from "../../redux/modalActions";
import { AppState } from "../../redux/store";
import Dropdown from "../../components/dropdowns/Dropdown";
import EditableTable from "../../components/EditableTable";
import { getHeight } from "../../helpers/screenSizing";

interface Props {
  saleId?: string;
  sales: Sale[];
  items: Item[];
  partners: Partner[];
  onSaleAdded: (sale: Sale) => void;
  onSaleEdited: (sale: Sale) => void;
  onModalTitleChanged: (title: string) => void;
}

const emptySale = {
  id: "",
  date: new Date(),
  description: "",
  itemsId: [],
  partnerId: "",
} as Sale;

const AddSaleScreen: FunctionComponent<Props> = ({
  saleId,
  sales,
  onSaleAdded,
  onModalTitleChanged,
  onSaleEdited,
  partners,
}) => {
  const currentSale = sales.find(i => i.id === saleId);
  const [sale, setSale] = useState(currentSale ?? emptySale);
  const [selectedItem, setSelectedItem] = useState({} as Partner);
  const [selectableItems] = useState(
    partners.map(partner => ({
      id: partner.id,
      title: partner.name,
    }))
  );
  const navigator = useNavigation();
  if (currentSale) {
    onModalTitleChanged("Редакция на стока");
  } else {
    onModalTitleChanged("Добавяне на стока");
  }

  const handlePartnerSelect = (partnerId: string) => {
    setSelectedItem(partners.find(p => p.id === partnerId) ?? ({} as Partner));
  };

  const onTextChange = (name: string, value: string) => {
    setSale({
      ...sale,
      [name]: value,
    });
  };

  return (
    <Page>
      <View
        style={{
          height: getHeight(),
        }}
      >
        <Dropdown
          placeholder="Въведете име на партньора"
          items={selectableItems}
          handleItemChosen={handlePartnerSelect}
          label="Име на партньора"
          border={true}
          style={{ marginBottom: 15 }}
        />
        <EditableTable />
        <Button
          label={currentSale ? "Редакция на стока" : "Добавяне на стока"}
          onPress={() => {
            currentSale ? onSaleEdited(sale) : onSaleAdded(sale);
            setSale(emptySale);
            navigator.navigate("Root");
          }}
          style={{
            alignSelf: "center",
          }}
        />
      </View>
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    sales: state.sales!.sales,
    partners: state.partners!.partners,
    items: state.items!.items,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSaleAdded: (sale: Sale) => {
      dispatch(salesActions.onAddSale(sale));
    },
    onSaleEdited: (sale: Sale) => {
      dispatch(salesActions.onEditSale(sale));
    },
    onModalTitleChanged: (modalTitle: string) => {
      dispatch(modalActions.onTitleChange(modalTitle));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSaleScreen);
