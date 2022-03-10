import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Page } from "../components/Page";
import Table from "../components/Table";
import { Partner } from "../helpers/models";
import { actionCreators, PartnersState } from "../redux/partnerActions";
import { AppState } from "../redux/store";

type PartnersListScreenProps = {
  onPartnersLoaded: () => void;
  partners: Partner[];
};

const PartnersListScreen = ({
  onPartnersLoaded,
  partners,
}: PartnersListScreenProps) => {
  useEffect(() => onPartnersLoaded());

  return (
    <Page>
      <Table
        data={partners}
        columns={[
          { name: "Име на партньора", propName: "name", flex: 4 },
          {
            name: "ДДС Номер",
            propName: "vatNumber",
            flex: 1,
            isRight: true,
          },
          {
            name: "Адрес",
            propName: "address",
            flex: 2,
            isRight: true,
          },
        ]}
      />
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return state.partners;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPartnersLoaded: () => {
      dispatch(actionCreators.onLoadPartners());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnersListScreen);
