import React from "react";
import { Avatar, Card, Paragraph, Title } from "react-native-paper";
import { Button } from "../../components/Themed";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

const PartnersReport = () => {
  return (
    <Card>
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={LeftContent}
      />
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Actions>
        <Button label={"Cancel"} />
        <Button label={"Ok"} />
      </Card.Actions>
    </Card>
  );
};

export default PartnersReport;
