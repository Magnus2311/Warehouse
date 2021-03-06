import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LoginResponseDTO,
  LoginUserDTO,
  RegisterUserDTO,
  Token,
  TryLoginDTO,
} from "../models";
import { get, post } from "../../../services/communication/connectionService";
import {
  ONE_HOUR,
  ONE_YEAR,
  USER_STORAGE_ACCESS_TOKEN,
  USER_STORAGE_REFRESH_TOKEN,
  USER_STORAGE_VARIABLE,
} from "../constants";
import { UserState } from "../redux/userActions";

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
  const loginResponse = await post<LoginResponseDTO>(
    "/users/login",
    {
      ...user,
      accessToken: await getAccessToken(),
      refreshToken: await getRefreshToken(),
    },
    true
  );
  await storeUser(loginResponse);
  return loginResponse;
}

export const logout = async () => {
  await deleteDataOnLogout();
  return post("/users/logout", { refreshToken: await getRefreshToken() }, true);
};

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

export const initUser = async () => {
  const user = {} as UserState;

  user.accessToken = (await getAccessToken()) ?? "";
  user.refreshToken = (await getRefreshToken()) ?? "";
  const userData = (await getUserData()) ?? ({} as UserState);
  user.username = userData.username;
  user.email = userData.email;

  return user;
};

const refreshAccessToken = async () => {
  return get<TryLoginDTO>(
    `/users/try-login?refreshToken=${await getRefreshToken()}`,
    true
  );
};

export const isAccessTokenActive = async () => !!(await getAccessToken());
export const isAuthenticated = async () =>
  (await isAccessTokenActive()) ? true : await isAccessTokenRefreshed();

const storeUser = async (user: LoginResponseDTO) => {
  try {
    const userJsonValue = JSON.stringify({
      username: user.username,
      email: user.email,
    });
    await AsyncStorage.setItem(USER_STORAGE_VARIABLE, userJsonValue);

    const accessToken = {
      value: user.accessToken,
      created: new Date(),
    } as Token;
    const accessTokenJsonValue = JSON.stringify(accessToken);
    await AsyncStorage.setItem(USER_STORAGE_ACCESS_TOKEN, accessTokenJsonValue);

    const refreshToken = {
      value: user.refreshToken,
      created: new Date(),
    } as Token;
    const refreshTokenJsonValue = JSON.stringify(refreshToken);
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
      if (
        new Date(new Date().toUTCString()).getTime() -
          new Date(token.created).getTime() <
        ONE_YEAR
      )
        return token.value;
      else await AsyncStorage.removeItem(USER_STORAGE_REFRESH_TOKEN);
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_STORAGE_ACCESS_TOKEN);
    if (jsonValue !== null) {
      const token = JSON.parse(jsonValue) as Token;
      if (token.value && token.value !== "") {
        debugger;
        if (
          new Date(new Date().toUTCString()).getTime() -
            new Date(token.created).getTime() <
          ONE_HOUR
        )
          return token.value;
        else {
          await AsyncStorage.removeItem(USER_STORAGE_ACCESS_TOKEN);
          if (await isAccessTokenRefreshed()) return await getAccessToken();
        }
      }
    } else {
      if (await isAccessTokenRefreshed()) return await getAccessToken();
    }
  } catch (e) {
    console.log(e);
  }

  return undefined;
};

const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_STORAGE_VARIABLE);
    if (jsonValue !== null) {
      const user = JSON.parse(jsonValue) as UserState;
      if (user) {
        return user;
      }
    }
  } catch (e) {
    console.log(e);
  }

  return null;
};

const isAccessTokenRefreshed = async () => {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    const accessToken = (await refreshAccessToken()).accessToken;
    if (accessToken && accessToken !== "") {
      await storeAccessToken(accessToken);
      return true;
    }
  }

  return false;
};

const storeAccessToken = async (token: string) => {
  const accessToken = {
    value: token,
    created: new Date(),
  } as Token;
  const accessTokenJsonValue = JSON.stringify(accessToken);
  await AsyncStorage.setItem(USER_STORAGE_ACCESS_TOKEN, accessTokenJsonValue);
};

const deleteDataOnLogout = async () => {
  await AsyncStorage.removeItem(USER_STORAGE_VARIABLE);
  await AsyncStorage.removeItem(USER_STORAGE_ACCESS_TOKEN);
  await AsyncStorage.removeItem(USER_STORAGE_REFRESH_TOKEN);
};
