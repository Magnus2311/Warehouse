import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Page } from "../components/Page";
import { Partner } from "../helpers/models";
import { actionCreators } from "../redux/partnerActions";
import { AppState } from "../redux/store";
import PartnersTable from "../components/Table/types/classes/PartnersTable";

interface PartnersListScreenProps {
  onPartnersLoaded: () => void;
  partners: Partner[];
}

const PartnersListScreen = ({
  onPartnersLoaded,
  partners,
}: PartnersListScreenProps) => {
  useEffect(() => onPartnersLoaded(), []);

  const columns = [
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
  ];

  return (
    <Page>
      <PartnersTable
        columns={columns}
        listableItems={partners}
        navigation={useNavigation()}
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
