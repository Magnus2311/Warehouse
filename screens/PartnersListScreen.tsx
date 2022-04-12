import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Page } from "../components/Page";
import { Partner } from "../helpers/models";
import { actionCreators } from "../redux/partnerActions";
import { AppState } from "../redux/store";
import PartnersTable from "../components/Table/types/classes/PartnersTable";

interface PartnersListScreenProps {
  onPartnersLoaded: () => void;
  onAllPartnersLoaded: () => void;
  partners: Partner[];
}

const PartnersListScreen = ({
  onPartnersLoaded,
  partners,
  onAllPartnersLoaded,
}: PartnersListScreenProps) => {
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(
    () => (showDeleted ? onAllPartnersLoaded() : onPartnersLoaded()),
    [showDeleted]
  );

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
        showDeleted={{ setShowDeleted, showDeleted }}
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
    onAllPartnersLoaded: () => {
      dispatch(actionCreators.onLoadAllPartners());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnersListScreen);
