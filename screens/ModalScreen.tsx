import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { View } from "../components/Themed";
import React from "react";
import { RootStackScreenProps } from "../types";

const ModalScreen = ({ route }: RootStackScreenProps<"Modal">) => {
  const { component } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {component}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default ModalScreen;
