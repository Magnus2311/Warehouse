import Toast from "react-native-toast-message";
import { Action, Reducer } from "redux";
import { Item } from "../helpers/models";
import { ADD_ITEM, LOAD_ITEMS } from "./constants";
import { AppThunk } from "./store";

export interface ItemsState {
  items: Item[];
}

export interface AddItemAction {
  type: "ADD_ITEM";
  item: Item;
}

export interface LoadItemsAction {
  type: "LOAD_ITEMS";
  items: Item[];
}

export type KnownAction = AddItemAction | LoadItemsAction;

export const addItem = (item: Item): AddItemAction => ({
  type: ADD_ITEM,
  item,
});

export const loadItems = (items: Item[]): LoadItemsAction => ({
  type: LOAD_ITEMS,
  items,
});

export const actionCreators = {
  onAddItem: (item: Item): AppThunk<void, KnownAction> => {
    debugger;
    return (dispatch) => {
      debugger;
      dispatch<any>(addItem(item));
      // fetch("/api/items/add", {
      //   method: "POST",
      //   body: JSON.stringify(item),
      // })
      //   .then((response) => {
      //     if (response.ok) {
      //       response.json().then((item: Item) => {
      //         dispatch(addItem(item));
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     Toast.show({
      //       type: "error",
      //       text1: "Грешка",
      //       text2: "Добавянето на стока беше неуспешно",
      //     });
      //     console.log(error);
      //   });
    };
  },
  onLoadItems: (): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      dispatch(loadItems([]));
    };
  },
};

export const reducer: Reducer<ItemsState> = (
  state: ItemsState | undefined,
  incomingAction: Action
): ItemsState => {
  debugger;
  if (state === undefined) {
    return { items: [] };
  }

  if (state.items === undefined) state.items = [];

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ADD_ITEM:
      debugger;
      return { items: [...state.items, action.item] };
    case LOAD_ITEMS:
      return { ...state.items, items: action.items };
    default:
      return state;
  }
};
