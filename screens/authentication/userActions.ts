import { Action, Reducer } from "redux";
import { UserDTO } from "../../helpers/models";
import { AppThunk } from "../../redux/store";
import { add, login } from "./authenticationService";

export interface UserState {
  username: string;
}

export interface AddUserAction {
  type: "ADD_USER";
  username: string;
}

export interface LoginAction {
  type: "LOGIN_USER";
  username: string;
}

type KnownActions = AddUserAction | LoginAction;

export const addUser = (username: string): KnownActions => ({
  type: "ADD_USER",
  username,
});

export const loginUser = (username: string): KnownActions => ({
  type: "LOGIN_USER",
  username,
});

export const actionCreators = {
  onAddUser: ({
    username,
    password,
  }: UserDTO): AppThunk<void, KnownActions> => {
    return (dispatch) => {
      add({ username, password }).then(() => {
        dispatch<any>(addUser(username));
      });
    };
  },
  login: ({ username, password }: UserDTO): AppThunk<void, KnownActions> => {
    return (dispatch: any) => {
      login({ username, password }).then((loginResponse) => {
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
    case "ADD_USER":
      return { username: action.username };
    case "LOGIN_USER":
      return { username: action.username };
    default:
      return state;
  }
};