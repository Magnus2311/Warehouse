import Toast from "react-native-toast-message";
import { Action, Reducer } from "redux";
import { Item } from "../helpers/models";
import { ADD_ITEM } from "./constants";

export interface ItemsState {
  items: Item[];
}

export interface AddItemAction {
  type: "ADD_ITEM";
  item: Item;
}

export type KnownAction = AddItemAction;

export const addItem = (item: Item): AddItemAction => ({
  type: ADD_ITEM,
  item,
});

export const actionCreators = {
  onAddItem: (item: Item) => {
    return (dispatch: any) => {
      fetch("/api/items/add", {
        method: "POST",
        body: JSON.stringify(item),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((item: Item) => {
              dispatch(addItem(item));
            });
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Грешка",
            text2: "Добавянето на стока беше неуспешно",
          });
          console.log(error);
        });
    };
  },
};

export const reducer: Reducer<ItemsState> = (
  state: ItemsState | undefined,
  incomingAction: Action
): ItemsState => {
  if (state === undefined) {
    return { items: [] };
  }

  if (state.items === undefined) state.items = [];

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ADD_ITEM:
      return { items: [...state.items, action.item] };
    default:
      return state;
  }
};
