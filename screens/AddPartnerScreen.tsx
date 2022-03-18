import { connect } from "react-redux";
import { Partner } from "../helpers/models";
import { actionCreators } from "../redux/partnerActions";
import { actionCreators as modalActionCreators } from "../redux/modalActions";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "../components/Themed";
import { Page } from "../components/Page";
import { AppState } from "../redux/store";

type AddPartnerScreenProps = {
  partners: Partner[];
  onPartnerAdded: (partner: Partner) => void;
  onPartnerEdited: (partner: Partner) => void;
  onModalTitleChanged: (title: string) => void;
  partnerId?: string;
};

const emptyPartner = {
  id: "",
  address: "",
  name: "",
  vatNumber: "",
} as Partner;

const AddPartnerScreen = ({
  onPartnerAdded,
  partners,
  onModalTitleChanged,
  onPartnerEdited,
  partnerId,
}: AddPartnerScreenProps) => {
  const currentPartner = partners && partners.find((p) => p.id === partnerId);
  const [partner, setPartner] = useState(currentPartner ?? emptyPartner);
  const navigator = useNavigation();
  if (currentPartner) {
    onModalTitleChanged("Редакция на партньор");
  } else {
    onModalTitleChanged("Добавяне на партньор");
  }

  const onTextChange = (name: string, value: string) => {
    setPartner({
      ...partner,
      [name]: value,
    });
  };

  return (
    <Page>
      <Input
        label="Име на партньора:"
        onChangeText={(txt) => onTextChange("name", txt)}
        value={partner.name}
        border={true}
      />
      <Input
        label="ДДС Номер:"
        onChangeText={(txt) => onTextChange("vatNumber", txt)}
        value={partner.vatNumber}
        border={true}
      />
      <Input
        label="Адрес:"
        onChangeText={(txt) => onTextChange("address", txt)}
        value={partner.address}
        border={true}
      />
      <Button
        label={currentPartner ? "Редакция" : "Добавяне"}
        onPress={() => {
          currentPartner ? onPartnerEdited(partner) : onPartnerAdded(partner);
          setPartner(emptyPartner);
          navigator.navigate("PartnersListScreen");
        }}
      />
    </Page>
  );
};

const mapStateToProps = (state: AppState) => state.partners;

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPartnerAdded: (partner: Partner) => {
      dispatch(actionCreators.onAddPartner(partner));
    },
    onPartnerEdited: (partner: Partner) => {
      dispatch(actionCreators.onEditPartner(partner));
    },
    onModalTitleChanged: (modalTitle: string) => {
      dispatch(modalActionCreators.onTitleChange(modalTitle));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPartnerScreen);
