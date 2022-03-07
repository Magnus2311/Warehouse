import React from "react";
import { connect } from "react-redux";
import { Text, View } from "../../components/Themed";

const Register = () => {
  return (
    <View>
      <Text
        onPress={(e) => {
          e.preventDefault();
        }}
      >
        Register
      </Text>
    </View>
  );
};

export default connect()(Register);
