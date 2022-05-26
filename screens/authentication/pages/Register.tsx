import React, { useState } from "react";
import { Button, Input, Text, View } from "../../../components/Themed";
import * as usersService from "../services/authenticationService";
import * as emailsService from "../../../services/emailsService";
import { SenderType, RegisterUserDTO } from "../models";
import { WAREHOUSE_WEB_ADDRESS } from "../../../helpers/constants";
import { useNavigation } from "@react-navigation/native";

enum RegistrationEnum {
  Email,
  Username,
  Password,
  ConfirmPassword,
}

const Registration = () => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [email, setEmail] = useState("");
  const [isPasswordMatching, setIsPasswordMatching] = useState(true);
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    changeIsRegisterActive(RegistrationEnum.Username, text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    changeIsRegisterActive(RegistrationEnum.Email, text);
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
      case RegistrationEnum.Email:
        const isEmail = emailsService.isValidEmail(text);
        setIsValidEmail(isEmail);
        setIsRegisterActive(
          text && text !== "" && isEmail && password && password !== ""
            ? isPasswordMatching
            : false
        );
      case RegistrationEnum.Username:
        usersService
          .isUsernameAvailable(text)
          .then((isAvailable: boolean) => setIsUsernameAvailable(isAvailable));
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

  const handleRegister = () => {
    const userToInsert = {
      username,
      password,
      email,
      callbackUrl: `${WAREHOUSE_WEB_ADDRESS}/registration/email-confirmed`,
      senderType: SenderType.Warehouse,
    } as RegisterUserDTO;
    usersService.add(userToInsert);
    navigation.navigate("PartnersListScreen");
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
        label="Username"
        placeholder="Enter your username"
        autoFocus
        border={true}
        // isValid={isUsernameAvailable}
      />
      <Input
        onChangeText={handleEmailChange}
        value={email}
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
          secureTextEntry
        />
        <Input
          onChangeText={handleConfirmPasswordChange}
          value={confirmPassword}
          label="Confirm password"
          placeholder="Confirm your password"
          border={true}
          secureTextEntry
          // isValid={isPasswordMatching}
        />
      </View>
      <Button
        onPress={handleRegister}
        style={{ width: "100%" }}
        disabled={!isRegisterActive}
        label={"Register"}
      />
    </View>
  );
};

export default Registration;
