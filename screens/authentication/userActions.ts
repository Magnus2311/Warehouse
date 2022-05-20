import { Action, Reducer } from "redux";
import { LoginUserDTO } from "../../helpers/models";
import { AppThunk } from "../../redux/store";
import { login } from "./authenticationService";

export interface UserState {
  username: string;
}

export interface LoginAction {
  type: "LOGIN_USER";
  username: string;
}

type KnownActions = LoginAction;

export const loginUser = (username: string): KnownActions => ({
  type: "LOGIN_USER",
  username,
});

export const actionCreators = {
  login: (user: LoginUserDTO): AppThunk<void, KnownActions> => {
    return (dispatch: any) => {
      login(user).then((loginResponse) => {
        dispatch(loginUser(loginResponse.username));
      });
    };
  },
};

const initialState = {
  username: "",
};

export const reducer: Reducer<UserState> = (
  state = initialState,
  incomingAction: Action
): UserState => {
  const action = incomingAction as KnownActions;
  switch (action.type) {
    case "LOGIN_USER":
      return { username: action.username };
    default:
      return state;
  }
};
