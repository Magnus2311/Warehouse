import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

import { View } from "../components/Themed";
import React from "react";
import { RootStackScreenProps } from "../types";

const ModalScreen = ({ navigation, route }: RootStackScreenProps<"Modal">) => {
  const { component, title } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {component}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default ModalScreen;
