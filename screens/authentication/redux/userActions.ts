import { Action, Reducer } from "redux";
import { LoginResponseDTO, LoginUserDTO } from "../models";
import { AppThunk } from "../../../redux/store";
import { login, logout } from "../services/authenticationService";

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

export interface InitUserAction {
  type: "INIT_USER";
  user: UserState;
}

export interface LogoutAction {
  type: "LOGOUT";
}

type KnownActions = LoginAction | InitUserAction | LogoutAction;

export const loginUser = (user: LoginResponseDTO): KnownActions => ({
  type: "LOGIN_USER",
  user,
});

export const initUserAction = (user: UserState): KnownActions => ({
  type: "INIT_USER",
  user,
});

export const logoutAction = (): KnownActions => ({
  type: "LOGOUT",
});

export const actionCreators = {
  login: (user: LoginUserDTO): AppThunk<void, KnownActions> => {
    return (dispatch: any) => {
      login(user).then((loginResponse) => {
        dispatch(loginUser(loginResponse));
      });
    };
  },
  initUser: (user: UserState): AppThunk<void, KnownActions> => {
    return (dispatch: any) => {
      dispatch(initUserAction(user));
    };
  },
  logout: (): AppThunk<void, KnownActions> => {
    return async (dispatch: any) => {
      await logout().then(() => {
        dispatch(logoutAction());
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
    case "INIT_USER":
      return { ...action.user };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};
