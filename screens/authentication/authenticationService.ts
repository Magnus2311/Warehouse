import { UserDTO } from "../../helpers/models";
import { get, post } from "../../services/communication/connectionService";

interface LoginResponse {
  username: string;
}

interface ChangePasswordResponse {}

export function add(user: UserDTO) {
  return post("api/users/register", user, true);
}

export function isUsernameAvailable(username: string) {
  return get<boolean>(
    `api/users/check-username-availability?username=${username}`,
    true
  );
}

export function login(user: UserDTO) {
  return post<LoginResponse>("api/users/login", user, true);
}

export function changePassword(oldPassword: string, newPassword: string) {
  return post<ChangePasswordResponse>(
    "api/users/changePassword",
    {
      oldPassword,
      newPassword,
    },
    true
  ).then(async (response) => {});
}

export const resetPassword = (token: string, newPassword: string) => {
  return post("api/users/resetPassword", { token, newPassword }, true);
};
