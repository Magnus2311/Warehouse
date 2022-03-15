import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Page } from "../../components/Page";
import SalesTable from "../../components/Table/types/classes/SalesTable";
import { Sale } from "../../helpers/models";
import { isMobile } from "../../helpers/screenSizing";
import { actionCreators as salesActions } from "../../redux/salesActions";
import { actionCreators as partnersActions } from "../../redux/partnerActions";
import { actionCreators as itemActions } from "../../redux/itemActions";
import { AppState } from "../../redux/store";

interface Props {
  onSalesLoaded: () => void;
  onPartnersLoaded: () => void;
  onItemsLoaded: () => void;
  sales: Sale[];
}

const mapStateToProps = (state: AppState) => {
  return state.sales;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSalesLoaded: () => {
      dispatch(salesActions.onLoadSales());
    },
    onPartnersLoaded: () => {
      dispatch(partnersActions.onLoadPartners());
    },
    onItemsLoaded: () => {
      dispatch(itemActions.onLoadItems());
    }
  };
};

const SalesListScreen: React.FunctionComponent<Props> = ({
  sales,
  onSalesLoaded,
  onItemsLoaded,
  onPartnersLoaded
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    onSalesLoaded();
    onItemsLoaded();
    onPartnersLoaded();
  }, []);

  const columns = [
    { name: "Име на стока", propName: "name", flex: 6 },
    {
      name: isMobile ? "Д-на цена" : "Доставна цена",
      propName: "basePrice",
      flex: isMobile ? 2 : 1,
      isRight: true,
    },
    {
      name: isMobile ? "П-на цена" : "Продажна цена",
      propName: "sellPrice",
      flex: isMobile ? 2 : 1,
      isRight: true,
    },
  ];

  return (
    <Page>
      <SalesTable
        columns={columns}
        listableItems={sales}
        navigation={navigation}
      />
    </Page>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesListScreen);
