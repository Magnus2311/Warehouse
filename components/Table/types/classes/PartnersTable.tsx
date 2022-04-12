import React from "react";
import { connect } from "react-redux";
import Table from "../../Table";
import { actionCreators } from "../../../../redux/partnerActions";
import { AppState } from "../../../../redux/store";
import TableModel from "./TableModel";
import AddPartnerScreen from "../../../../screens/AddPartnerScreen";

class PartnersTable extends TableModel {
  render() {
    const { listableItems, columns, showDeleted } = this.props;
    return (
      <Table
        data={listableItems}
        columns={columns}
        deleteProps={{
          title: "Изтриване на партньор",
          content: "Желаете ли да изтриете избраният партньор",
          onDelete: this.onDelete,
        }}
        onEdit={this.onEdit}
        showDeleted={showDeleted}
      />
    );
  }

  public onDelete = (id: string) => {
    const { dispatch } = this.props;

    dispatch(actionCreators.onDeletePartner(id));
  };

  public onEdit = (id: string) => {
    const { navigation } = this.props;
    navigation.navigate("Modal", {
      component: <AddPartnerScreen partnerId={id} />,
    });
  };
}

const mapStateToProps = (state: AppState) => state.partners;

export default connect(mapStateToProps)(PartnersTable);
