import React, { Children } from "react";
import { PageContainer, Text, Separator } from "./Themed";
import { StyleSheet } from "react-native";

interface PageProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

export function Page({ title, children }: PageProps) {
  return (
    <PageContainer style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Separator />
      {children}
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
