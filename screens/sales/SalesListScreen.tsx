import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Page } from "../../components/Page";
import SalesTable from "../../components/Table/types/classes/SalesTable";
import { Sale } from "../../helpers/models";
import { isMobile } from "../../helpers/screenSizing";
import { actionCreators } from "../../redux/salesActions";
import { AppState } from "../../redux/store";

interface Props {
  onSalesLoaded: () => void;
  sales: Sale[];
}

const SalesListScreen: React.FunctionComponent<Props> = ({
  sales,
  onSalesLoaded,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    onSalesLoaded();
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

const mapStateToProps = (state: AppState) => {
  return state.sales;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSalesLoaded: () => {
      dispatch(actionCreators.onLoadSales());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesListScreen);
