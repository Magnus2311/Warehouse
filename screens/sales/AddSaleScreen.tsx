import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../../components/Page";
import { Button, View } from "../../components/Themed";
import { Item, Partner, Sale, SaleItem } from "../../helpers/models";
import { actionCreators as salesActions } from "../../redux/salesActions";
import { actionCreators as modalActions } from "../../redux/modalActions";
import { AppState } from "../../redux/store";
import Dropdown from "../../components/dropdowns/Dropdown";
import EditableTable from "../../components/EditableTable";
import { getHeight } from "../../helpers/screenSizing";
import { randomString } from "../../helpers/randomFunctions";

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
  isDeleted: false,
  description: "",
  saleItems: [],
  partnerId: "",
  totalAmount: 0,
} as Sale;

const AddSaleScreen: FunctionComponent<Props> = ({
  saleId,
  sales,
  onSaleAdded,
  onModalTitleChanged,
  onSaleEdited,
  partners,
  items,
}) => {
  const currentSale = sales.find((i) => i.id === saleId);
  const [sale, setSale] = useState(currentSale ?? emptySale);
  const [selectableItems] = useState(
    partners.map((partner) => ({
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
    setSale({ ...sale, partnerId });
  };

  const [selectedItems, setSelectedItems] = useState<SaleItem[]>(
    currentSale
      ? currentSale.saleItems.map((item) => ({
          uniqueId: randomString(),
          itemId: item.itemId,
          name: item.name,
          qtty: item.qtty,
          total: item.total,
          price: item.price,
          id: item.id,
        }))
      : []
  );

  return (
    <Page>
      <View
        style={{
          height: getHeight(),
        }}
      >
        <Dropdown
          placeholder="Въведете име на партньора"
          selectedItem={
            currentSale
              ? {
                  id: currentSale.partnerId,
                  title:
                    partners.find(
                      (partner) => partner.id === currentSale.partnerId
                    )?.name ?? "",
                }
              : undefined
          }
          items={selectableItems}
          handleItemChosen={handlePartnerSelect}
          label="Име на партньора"
          border={true}
          style={{ marginBottom: 15 }}
        />
        <EditableTable
          items={items}
          saleItems={selectedItems}
          setSelectedItems={setSelectedItems}
          sale={sale}
        />
        <Button
          disabled={
            selectedItems === undefined ||
            selectedItems.length === 0 ||
            sale.partnerId === ""
          }
          label={currentSale ? "Редакция на стока" : "Добавяне на стока"}
          onPress={() => {
            sale.totalAmount = selectedItems
              .map((item) => Number(item.total))
              .reduce((a, b) => a + b);
            sale.saleItems = selectedItems;
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
