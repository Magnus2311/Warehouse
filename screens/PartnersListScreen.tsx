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
  onPartnerRecovery: (partnerId: string) => void;
  onAllPartnersLoaded: () => void;
  partners: Partner[];
  showDeleted: boolean;
  setShowDeleted: (showDeleted: boolean) => void;
}

const PartnersListScreen = ({
  onPartnersLoaded,
  partners,
  onAllPartnersLoaded,
  onPartnerRecovery,
  setShowDeleted,
  showDeleted,
}: PartnersListScreenProps) => {
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
        showDeleted={{
          setShowDeleted,
          showDeleted,
          recoverProps: {
            title: "Възстановяване на партньор",
            content: "Желаете ли да възстановите избрания партньор",
            cancelBtnTxt: "Отказ",
            acceptBtnTxt: "Възстановяване",
            onAction: onPartnerRecovery,
          },
        }}
      />
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    partners: state.partners!.partners,
    showDeleted: state.partners!.showDeleted,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPartnersLoaded: () => {
      dispatch(actionCreators.onLoadPartners());
    },
    onPartnerRecovery: (partnerId: string) => {
      dispatch(actionCreators.onPartnerRecovery(partnerId));
    },
    onAllPartnersLoaded: () => {
      dispatch(actionCreators.onLoadAllPartners());
    },
    setShowDeleted: (showDeleted: boolean) => {
      dispatch(actionCreators.setShowDeleted(showDeleted));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnersListScreen);
