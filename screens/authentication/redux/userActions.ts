import { Action, Reducer } from "redux";
import { LoginResponseDTO, LoginUserDTO } from "../models";
import { AppThunk } from "../../../redux/store";
import { login } from "../services/authenticationService";

export interface UserState {
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginAction {
  type: "LOGIN_USER";
  user: LoginResponseDTO;
}

type KnownActions = LoginAction;

export const loginUser = (user: LoginResponseDTO): KnownActions => ({
  type: "LOGIN_USER",
  user,
});

export const actionCreators = {
  login: (user: LoginUserDTO): AppThunk<void, KnownActions> => {
    return (dispatch: any) => {
      login(user).then((loginResponse) => {
        dispatch(loginUser(loginResponse));
      });
    };
  },
};

const initialState = {
  username: "",
  email: "",
  accessToken: "",
  refreshToken: "",
};

export const reducer: Reducer<UserState> = (
  state = initialState,
  incomingAction: Action
): UserState => {
  const action = incomingAction as KnownActions;
  switch (action.type) {
    case "LOGIN_USER":
      return { ...action.user };
    default:
      return state;
  }
};
