import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LoginResponseDTO,
  LoginUserDTO,
  RegisterUserDTO,
  Token,
} from "../models";
import { get, post } from "../../../services/communication/connectionService";
import {
  USER_STORAGE_ACCESS_TOKEN,
  USER_STORAGE_REFRESH_TOKEN,
  USER_STORAGE_VARIABLE,
} from "../constants";

interface ChangePasswordResponse {}

export function add(user: RegisterUserDTO) {
  return post("/users/register", user, true);
}

export function isUsernameAvailable(username: string) {
  return get<boolean>(
    `/users/check-username-availability?username=${username}`,
    true
  );
}

export async function login(user: LoginUserDTO) {
  var loginResponse = await post<LoginResponseDTO>("/users/login", user, true);
  await storeUser(loginResponse);
  return loginResponse;
}

export function changePassword(oldPassword: string, newPassword: string) {
  return post<ChangePasswordResponse>(
    "/users/changePassword",
    {
      oldPassword,
      newPassword,
    },
    true
  ).then(async (response) => {});
}

export const resetPassword = (token: string, newPassword: string) => {
  return post("/users/resetPassword", { token, newPassword }, true);
};

export const isAuthenticated = async () => !!(await getRefreshToken());

const storeUser = async (user: LoginResponseDTO) => {
  try {
    var accessTokenJsonValue = JSON.stringify({
      username: user.username,
      email: user.email,
    });
    await AsyncStorage.setItem(USER_STORAGE_VARIABLE, accessTokenJsonValue);

    var accessToken = {
      value: user.accessToken,
      created: new Date(),
    } as Token;
    var accessTokenJsonValue = JSON.stringify(accessToken);
    await AsyncStorage.setItem(USER_STORAGE_ACCESS_TOKEN, accessTokenJsonValue);

    var refreshToken = {
      value: user.refreshToken,
      created: new Date(),
    } as Token;
    var refreshTokenJsonValue = JSON.stringify(refreshToken);
    await AsyncStorage.setItem(
      USER_STORAGE_REFRESH_TOKEN,
      refreshTokenJsonValue
    );
  } catch (e) {
    console.log(e);
  }
};

const getRefreshToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_STORAGE_REFRESH_TOKEN);
    if (jsonValue !== null) {
      const token = JSON.parse(jsonValue) as Token;
      var expiryDate = new Date().setHours(
        new Date(token.created).getHours() + 1
      );
      if (expiryDate >= new Date().getHours()) return token.value;
      else await AsyncStorage.removeItem(USER_STORAGE_REFRESH_TOKEN);
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};
