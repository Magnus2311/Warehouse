import { StatusBar } from "expo-status-bar";
import React, { FunctionComponent } from "react";
import { Platform, StyleSheet, View } from "react-native";

interface ModalScreenProps {
  children: React.ReactNode | React.ReactNode[];
  open: boolean;
}

const ModalScreen: FunctionComponent<ModalScreenProps> = ({
  children,
  open,
}) => {
  if (!open) return null;

  return (
    <View style={{
      position: "absolute",
      top: "50%",
      left: "50%"
    }}>
      {children}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default ModalScreen;
