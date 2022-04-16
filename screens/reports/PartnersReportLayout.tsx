import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Avatar, Card } from "react-native-paper";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="briefcase" />;

const PartnersReportLayout = () => {
  const navigator = useNavigation();

  return (
    <Card
      onPress={() => {
        navigator.navigate("PartnersReport");
      }}
    >
      <Card.Title
        title="Справка Партньори"
        subtitle="Всички продажби групирани по партньор"
        left={LeftContent}
      />
    </Card>
  );
};

export default PartnersReportLayout;
