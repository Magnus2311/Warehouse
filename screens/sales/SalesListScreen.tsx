import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../../components/Page";
import SalesTable from "../../components/Table/types/classes/SalesTable";
import { Partner, Sale } from "../../helpers/models";
import { isMobile } from "../../helpers/screenSizing";
import { actionCreators as salesActions } from "../../redux/salesActions";
import { actionCreators as partnersActions } from "../../redux/partnerActions";
import { actionCreators as itemActions } from "../../redux/itemActions";
import { AppState } from "../../redux/store";
import { getDateFormated, toDecimalFormat } from "../../helpers/extensions";

interface Props {
  onSalesLoaded: () => void;
  onAllSalesLoaded: () => void;
  onPartnersLoaded: () => void;
  onItemsLoaded: () => void;
  sales: Sale[];
  partners: Partner[];
}

const mapStateToProps = (state: AppState) => {
  return {
    sales: state.sales?.sales || [],
    partners: state.partners?.partners || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSalesLoaded: () => {
      dispatch(salesActions.onLoadSales());
    },
    onAllSalesLoaded: () => {
      dispatch(salesActions.onLoadAllSales());
    },
    onPartnersLoaded: () => {
      dispatch(partnersActions.onLoadAllPartners());
    },
    onItemsLoaded: () => {
      dispatch(itemActions.onLoadAllItems());
    },
  };
};

const SalesListScreen: React.FunctionComponent<Props> = ({
  sales,
  partners,
  onSalesLoaded,
  onItemsLoaded,
  onPartnersLoaded,
  onAllSalesLoaded,
}) => {
  const navigation = useNavigation();

  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    showDeleted ? onAllSalesLoaded() : onSalesLoaded();
    onItemsLoaded();
    onPartnersLoaded();
  }, [showDeleted]);

  const columns = [
    { name: "Име на стока", propName: "partner", flex: 6 },
    {
      name: "Дата",
      propName: "date",
      flex: isMobile ? 2 : 1,
      isRight: true,
    },
    {
      name: "Обща сума",
      propName: "total",
      flex: isMobile ? 2 : 1,
      isRight: true,
    },
  ];

  return (
    <Page>
      <SalesTable
        columns={columns}
        listableItems={sales.map((sale) => ({
          id: sale.id,
          partner:
            partners.find((partner) => partner.id === sale.partnerId)?.name ??
            "",
          date: getDateFormated(sale.date),
          description: sale.description,
          total: toDecimalFormat(sale.totalAmount),
        }))}
        navigation={navigation}
        showDeleted={{ setShowDeleted, showDeleted }}
      />
    </Page>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesListScreen);
