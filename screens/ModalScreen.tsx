import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { View } from "../components/Themed";
import React, { FunctionComponent, ReactNode } from "react";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

interface ModalScreenProps {
  props: NativeStackScreenProps<RootStackParamList>;
}

const ModalScreen: FunctionComponent<ModalScreenProps> = ({ props }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {component}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default ModalScreen;
