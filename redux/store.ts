import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Item } from "../helpers/models";
import * as items from "./itemActions";

export interface AppState {
  items: items.ItemsState | undefined;
}

export const reducers = {
  items: items.reducer,
};

export type AppThunk<ReturnType, ActionType> = ThunkAction<
  ReturnType,
  AppState,
  null,
  Action<ActionType>
>;
