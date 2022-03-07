import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { View } from "../components/Themed";
import React from "react";
import { RootStackScreenProps } from "../types";
import { ModalTypes } from "../helpers/models";
import AddItemScreen from "./AddItemScreen";

const ModalScreen = ({ route }: RootStackScreenProps<"Modal">) => {
  const { component } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {renderChild(component)}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

const renderChild = (modalType: ModalTypes) => {
  switch (modalType) {
    case ModalTypes.AddItemScreen:
      return <AddItemScreen />;
  }
};

export default ModalScreen;
