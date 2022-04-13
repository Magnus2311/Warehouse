import React from "react";
import { connect } from "react-redux";
import Table from "../../Table";
import { AppState } from "../../../../redux/store";
import TableModel from "./TableModel";
import { actionCreators } from "../../../../redux/salesActions";
import AddSaleScreen from "../../../../screens/sales/AddSaleScreen";

class SalesTable extends TableModel {
  render() {
    const { listableItems, columns, showDeleted } = this.props;
    return (
      <Table
        data={listableItems}
        columns={columns}
        deleteProps={{
          title: "Изтриване на продажба",
          content: "Желаете ли да изтриете избраната продажба",
          cancelBtnTxt: "Отказ",
          acceptBtnTxt: "Изтриване",
          onAction: this.onDelete,
        }}
        onEdit={this.onEdit}
        showDeleted={showDeleted}
      />
    );
  }

  public onDelete = (id: string) => {
    const { dispatch } = this.props;

    dispatch(actionCreators.onDeleteSale(id));
  };

  public onEdit = (id: string) => {
    const { navigation } = this.props;
    navigation.navigate("Modal", {
      component: <AddSaleScreen saleId={id} />,
    });
  };
}

const mapStateToProps = (state: AppState) => state.sales!.sales;

export default connect(mapStateToProps)(SalesTable);
