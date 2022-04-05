import React from "react";
import { connect } from "react-redux";
import Table from "../../Table";
import { actionCreators } from "../../../../redux/itemActions";
import { AppState } from "../../../../redux/store";
import TableModel from "./TableModel";
import AddItemScreen from "../../../../screens/AddItemScreen";
import { Item, TableAction } from "../../../../helpers/models";
import BuyItemScreen from "../../../../screens/items/BuyItemScreen";

class ItemsTable extends TableModel {
  render() {
    const { listableItems, columns } = this.props;
    const additionalActions = [
      {
        name: "plus",
        color: "green",
        onPress: (item: Item) => {
          const { navigation } = this.props;
          navigation.navigate("Modal", {
            component: <BuyItemScreen item={item} />,
          });
        },
      } as TableAction,
    ];
    return (
      <Table
        data={listableItems}
        columns={columns}
        deleteProps={{
          title: "Изтриване на стока",
          content: "Желаете ли да изтриете избраната стока",
          onDelete: this.onDelete,
        }}
        onEdit={this.onEdit}
        additionalActions={additionalActions}
      />
    );
  }

  public onDelete = (id: string) => {
    const { dispatch } = this.props;

    dispatch(actionCreators.onDeleteItem(id));
  };

  public onEdit = (id: string) => {
    const { navigation } = this.props;
    navigation.navigate("Modal", {
      component: <AddItemScreen itemId={id} />,
    });
  };
}

const mapStateToProps = (state: AppState) => state.items;

export default connect(mapStateToProps)(ItemsTable);
