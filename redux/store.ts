import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as items from "./itemActions";
import * as title from "./modalActions";
import * as partners from "./partnerActions";

export interface AppState {
  items: items.ItemsState | undefined;
  title: title.ModalState | undefined;
  partners: partners.PartnersState | undefined;
}

export const reducers = {
  items: items.reducer,
  title: title.reducer,
  partners: partners.reducer,
};

export type AppThunk<ReturnType, ActionType> = ThunkAction<
  ReturnType,
  AppState,
  null,
  Action<ActionType>
>;
