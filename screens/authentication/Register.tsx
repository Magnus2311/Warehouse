import React, { useState } from "react";
import { Button, Input, Text, View } from "../../components/Themed";
import { add } from "./authenticationService";
import * as emailsService from "../../services/emailsService";

enum RegistrationEnum {
  Username,
  Password,
  ConfirmPassword,
}

const Registration = () => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordMatching, setIsPasswordMatching] = useState(true);
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    changeIsRegisterActive(RegistrationEnum.Username, text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text === "" && confirmPassword === "") setIsPasswordMatching(true);
    changeIsRegisterActive(RegistrationEnum.Password, text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setIsPasswordMatching(text === password);
    changeIsRegisterActive(RegistrationEnum.ConfirmPassword, text);
  };

  const changeIsRegisterActive = (field: RegistrationEnum, text: string) => {
    switch (field) {
      case RegistrationEnum.Username:
        const isEmail = emailsService.isValidEmail(text);
        setIsValidEmail(isEmail);
        setIsRegisterActive(
          text && text !== "" && isEmail && password && password !== ""
            ? isPasswordMatching
            : false
        );
        break;
      case RegistrationEnum.Password:
        setIsRegisterActive(
          text && confirmPassword && text === confirmPassword
            ? isValidEmail
            : false
        );
        break;
      case RegistrationEnum.ConfirmPassword:
        setIsRegisterActive(
          text && password && text === password && username !== ""
            ? isValidEmail
            : false
        );
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const template = "<ConfirmationEmailTemplate username={username} />";
    const userToInsert = {
      createdDate: new Date(),
      password: password,
      username: username,
      template: template,
    };
    add(userToInsert);
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
        <Text>Let's get started</Text>
      </View>
      <View>
        <Text>Sign up for free and get a lot of perks!</Text>
      </View>
      <Input
        onChangeText={handleUsernameChange}
        value={username}
        label="E-mail"
        placeholder="Enter your email"
        autoFocus
        border={true}
        // isValid={isValidEmail}
      />
      <View
        style={{
          display: "flex",
        }}
      >
        <Input
          onChangeText={handlePasswordChange}
          value={password}
          label="Password"
          placeholder="Enter your password"
          keyboardType="visible-password"
          border={true}
        />
        <Input
          onChangeText={handleConfirmPasswordChange}
          value={confirmPassword}
          label="Confirm password"
          placeholder="Confirm your password"
          border={true}
          // isValid={isPasswordMatching}
        />
      </View>
      <Button
        onPress={handleSubmit}
        style={{ width: "100%" }}
        disabled={!isRegisterActive}
        label={"Register"}
      />
    </View>
  );
};

export default Registration;
