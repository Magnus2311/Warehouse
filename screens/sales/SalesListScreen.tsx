import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../../components/Page";
import SalesTable from "../../components/Table/types/classes/SalesTable";
import { IListable, Partner, Sale } from "../../helpers/models";
import { isMobileScreen } from "../../helpers/screenSizing";
import { actionCreators as salesActions } from "../../redux/salesActions";
import { actionCreators as partnersActions } from "../../redux/partnerActions";
import { actionCreators as itemActions } from "../../redux/itemActions";
import { AppState } from "../../redux/store";
import { getDateFormated, toDecimalFormat } from "../../helpers/extensions";

interface Props {
  onSalesLoaded: () => void;
  onSaleRecovery: (itemId: string) => void;
  onAllSalesLoaded: () => void;
  onPartnersLoaded: () => void;
  onItemsLoaded: () => void;
  sales: Sale[];
  partners: Partner[];
  setShowDeleted: (showDeleted: boolean) => void;
  showDeleted: boolean;
}

interface SaleListable extends IListable {
  partner: string;
  date: string;
  description: string;
  total: string;
}

const mapStateToProps = (state: AppState) => {
  return {
    sales: state.sales?.sales || [],
    partners: state.partners?.partners || [],
    showDeleted: state.sales!.showDeleted,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSalesLoaded: () => {
      dispatch(salesActions.onLoadSales());
    },
    onSaleRecovery: (saleId: string) => {
      dispatch(salesActions.onSaleRecovery(saleId));
    },
    onAllSalesLoaded: () => {
      dispatch(salesActions.onLoadAllSales());
    },
    onPartnersLoaded: () => {
      dispatch(partnersActions.onLoadPartners());
    },
    onItemsLoaded: () => {
      dispatch(itemActions.onLoadAllItems());
    },
    setShowDeleted: (showDeleted: boolean) => {
      dispatch(salesActions.setShowDeleted(showDeleted));
    },
  };
};

const SalesListScreen: React.FunctionComponent<Props> = ({
  sales,
  partners,
  onSalesLoaded,
  onSaleRecovery,
  onItemsLoaded,
  onPartnersLoaded,
  onAllSalesLoaded,
  showDeleted,
  setShowDeleted,
}) => {
  const navigation = useNavigation();

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
      flex: isMobileScreen ? 3 : 2,
    },
    {
      name: "Обща сума",
      propName: "total",
      flex: isMobileScreen ? 2 : 1,
      isRight: true,
    },
  ];

  return (
    <Page>
      <SalesTable
        columns={columns}
        listableItems={sales.map(
          (sale) =>
            ({
              id: sale.id,
              partner:
                partners.find((partner) => partner.id === sale.partnerId)
                  ?.name ?? "",
              date: getDateFormated(sale.date),
              description: sale.description,
              total: toDecimalFormat(sale.totalAmount),
              isDeleted: sale.isDeleted,
            } as SaleListable)
        )}
        navigation={navigation}
        showDeleted={{
          setShowDeleted,
          showDeleted,
          recoverProps: {
            title: "Възстановяване на продажба",
            content: "Желаете ли да възстановите избраната продажба",
            cancelBtnTxt: "Отказ",
            acceptBtnTxt: "Възстановяване",
            onAction: onSaleRecovery,
          },
        }}
      />
    </Page>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesListScreen);
