import { Action, Reducer } from "redux";
import { LoginResponse, LoginUserDTO } from "../../../helpers/models";
import { AppThunk } from "../../../redux/store";
import { login } from "../services/authenticationService";

export interface UserState {
  username: string;
  email: string;
}

export interface LoginAction {
  type: "LOGIN_USER";
  username: string;
  email: string;
}

type KnownActions = LoginAction;

export const loginUser = ({
  username,
  email,
}: LoginResponse): KnownActions => ({
  type: "LOGIN_USER",
  username,
  email,
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
};

export const reducer: Reducer<UserState> = (
  state = initialState,
  incomingAction: Action
): UserState => {
  const action = incomingAction as KnownActions;
  switch (action.type) {
    case "LOGIN_USER":
      return { ...action };
    default:
      return state;
  }
};
