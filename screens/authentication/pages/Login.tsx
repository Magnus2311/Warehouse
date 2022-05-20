import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useState } from "react";
import { connect } from "react-redux";
import { Button, Input, Text, View } from "../../../components/Themed";
import { LoginUserDTO } from "../../../helpers/models";
import { isValidEmail } from "../../../services/emailsService";
import { actionCreators } from "../redux/userActions";

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogin: (user: LoginUserDTO) => {
      dispatch(actionCreators.login(user));
    },
  };
};

interface Props {
  onLogin: (user: LoginUserDTO) => void;
}

const Login: FunctionComponent<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = () => {
    const isEmail = isValidEmail(username);
    const userToInsert = {
      username: isEmail ? "" : username,
      email: isEmail ? username : "",
      password,
    } as LoginUserDTO;
    onLogin(userToInsert);
    // navigation.navigate("PartnersListScreen");
  };

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
    >
      {/* <img
      alt="Life Mode logo"
      src="/images/logos/logo_transparent.png"
      style={{ height: "20rem", width: "20rem", alignSelf: "baseline" }}
    /> */}
      <View>
        <Text>Login in Warehouse</Text>
      </View>
      <Input
        onChangeText={handleUsernameChange}
        value={username}
        label="Username"
        placeholder="Enter your username"
        autoFocus
        border={true}
        // isValid={isUsernameAvailable}
      />
      <Input
        onChangeText={handlePasswordChange}
        value={password}
        label="Password"
        placeholder="Enter your password"
        keyboardType="visible-password"
        border={true}
        secureTextEntry
      />
      <Button onPress={handleLogin} style={{ width: "100%" }} label={"Login"} />
    </View>
  );
};

export default connect(null, mapDispatchToProps)(Login);
