import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as items from "./itemActions";
import * as title from "./modalActions";
import * as partners from "./partnerActions";
import * as sales from "./salesActions";

export interface AppState {
  items: items.ItemsState | undefined;
  title: title.ModalState | undefined;
  partners: partners.PartnersState | undefined;
  sales: sales.SalesState | undefined;
}

export const reducers = {
  items: items.reducer,
  title: title.reducer,
  partners: partners.reducer,
  sales: sales.reducer,
};

export type AppThunk<ReturnType, ActionType> = ThunkAction<
  ReturnType,
  AppState,
  null,
  Action<ActionType>
>;
