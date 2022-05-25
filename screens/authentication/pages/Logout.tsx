import { FontAwesome } from "@expo/vector-icons";
import React, { FunctionComponent } from "react";
import { Pressable } from "react-native";
import { connect } from "react-redux";
import { Button } from "../../../components/Themed";
import { actionCreators } from "../redux/userActions";

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => {
      dispatch(actionCreators.logout());
    },
  };
};

interface Props {
  onLogout: () => void;
}

const Logout: FunctionComponent<Props> = ({ onLogout }) => {
  return (
    <Pressable onPress={onLogout}>
      <FontAwesome
        name="sign-out"
        size={30}
        color="green"
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
};

export default connect(null, mapDispatchToProps)(Logout);
