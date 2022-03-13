import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../../components/Page";
import { Button } from "../../components/Themed";
import { Item, Partner, Sale } from "../../helpers/models";
import { actionCreators as salesActions } from "../../redux/salesActions";
import { actionCreators as modalActions } from "../../redux/modalActions";
import { AppState } from "../../redux/store";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import Dropdown from "../../components/dropdowns/Dropdown";

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
  items,
  partners,
}) => {
  const currentSale = sales.find((i) => i.id === saleId);
  const [sale, setSale] = useState(currentSale ?? emptySale);
  const [selectedItem, setSelectedItem] = useState({} as Partner);
  const [selectableItems] = useState(partners.map((partner) => partner.name));
  const navigator = useNavigation();
  if (currentSale) {
    onModalTitleChanged("Редакция на стока");
  } else {
    onModalTitleChanged("Добавяне на стока");
  }

  const handlePartnerSelect = (partnerName: string) => {
    setSelectedItem(
      partners.find((p) => p.name === partnerName) ?? ({} as Partner)
    );
  };

  const onTextChange = (name: string, value: string) => {
    setSale({
      ...sale,
      [name]: value,
    });
  };

  return (
    <Page>
      <Dropdown
        items={selectableItems}
        handleItemChosen={handlePartnerSelect}
      />
      <Button
        label={currentSale ? "Редакция на стока" : "Добавяне на стока"}
        onPress={() => {
          currentSale ? onSaleEdited(sale) : onSaleAdded(sale);
          setSale(emptySale);
          navigator.navigate("Root");
        }}
      />
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
function TAutocompleteDropdownItem(
  arg0: { id: string; title: string },
  TAutocompleteDropdownItem: any
): [any, any] {
  throw new Error("Function not implemented.");
}
