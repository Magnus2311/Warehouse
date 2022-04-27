import { API_PATH, SSO_API_PATH } from "../../helpers/constants";
import { UserDTO } from "../../helpers/models";
import { post } from "../../services/communication/connectionService";

interface LoginResponse {
  username: string;
}

interface ChangePasswordResponse {}

export function add(user: UserDTO) {
  return post(SSO_API_PATH + "api/users/add", user);
}

export function login(user: UserDTO) {
  return post<LoginResponse>(SSO_API_PATH + "api/users/login", user);
}

export function changePassword(oldPassword: string, newPassword: string) {
  return post<ChangePasswordResponse>(
    SSO_API_PATH + "api/users/changePassword",
    { oldPassword, newPassword }
  ).then(async (response) => {});
}

export const resetPassword = (token: string, newPassword: string) => {
  return post(SSO_API_PATH + "api/users/resetPassword", { token, newPassword });
};
