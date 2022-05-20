import {
  LoginResponse,
  LoginUserDTO,
  RegisterUserDTO,
} from "../../../helpers/models";
import { get, post } from "../../../services/communication/connectionService";

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

export function login(user: LoginUserDTO) {
  return post<LoginResponse>("/users/login", user, true);
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

export const getRefreshToken = () => SecureStore.get("access_token");
export const isAuthenticated = () => !!getRefreshToken();
