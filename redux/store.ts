import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as items from "./itemActions";
import * as title from "./modalActions";
import * as partners from "./partnerActions";
import * as sales from "./salesActions";
import * as user from "../screens/authentication/userActions";

export interface AppState {
  items: items.ItemsState;
  title: title.ModalState;
  partners: partners.PartnersState;
  sales: sales.SalesState;
  user: user.UserState;
}

export const reducers = {
  items: items.reducer,
  title: title.reducer,
  partners: partners.reducer,
  sales: sales.reducer,
  user: user.reducer,
};

export type AppThunk<ReturnType, ActionType> = ThunkAction<
  ReturnType,
  AppState,
  null,
  Action<ActionType>
>;
