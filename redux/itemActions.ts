import Toast from "react-native-toast-message";
import { Action, Reducer } from "redux";
import { API_PATH } from "../helpers/constants";
import { Item } from "../helpers/models";
import {
  deletee,
  get,
  post,
  put,
} from "../services/communication/connectionService";
import { ADD_ITEM, LOAD_ITEMS } from "./constants";
import { AppThunk } from "./store";

export interface ItemsState {
  items: Item[];
}

interface AddItemAction {
  type: "ADD_ITEM";
  item: Item;
}

interface EditItemAction {
  type: "EDIT_ITEM";
  item: Item;
}

interface LoadItemsAction {
  type: "LOAD_ITEMS";
  items: Item[];
}

interface DeleteItemAction {
  type: "DELETE_ITEM";
  itemId: string;
}

export type KnownAction =
  | AddItemAction
  | LoadItemsAction
  | EditItemAction
  | DeleteItemAction;

export const addItem = (item: Item): AddItemAction => ({
  type: ADD_ITEM,
  item,
});

export const editItem = (item: Item): EditItemAction => ({
  type: "EDIT_ITEM",
  item,
});

export const deleteItem = (itemId: string): DeleteItemAction => ({
  type: "DELETE_ITEM",
  itemId,
});

export const loadItems = (items: Item[]): LoadItemsAction => ({
  type: LOAD_ITEMS,
  items,
});

export const actionCreators = {
  onAddItem: (itemDTO: Item): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      post<Item>("api/items/", itemDTO)
        .then((item) => {
          dispatch(addItem(item));
          Toast.show({
            type: "error",
            text1: "Грешка",
            text2: "Добавянето на стока беше неуспешно",
          });
        })
        .catch((ex) => {
          console.log(ex);
          Toast.show({
            type: "error",
            text1: "Грешка",
            text2: "Добавянето на стока беше неуспешно",
          });
        });
    };
  },
  onLoadItems: (): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      get<Item>("api/items/")
        .then((items) => {
          dispatch(loadItems(items));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  },
  onEditItem: (itemDTO: Item): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      put<Item>("api/items/", itemDTO)
        .then((item) => {
          dispatch(editItem(item));
        })
        .catch((ex) => {
          console.log(ex);
          Toast.show({
            type: "error",
            text1: "Грешка",
            text2: "Редакцията на стока беше неуспешна",
          });
        });
    };
  },
  onDeleteItem: (itemId: string): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      deletee("api/items/", itemId).then((isDeleted) => {
        if (isDeleted) dispatch(deleteItem(itemId));
        else {
          Toast.show({
            type: "error",
            text1: "Грешка",
            text2: "Изтриването на стока беше неуспешно",
          });
        }
      });
    };
  },
};

const initialState = {
  items: [],
};

export const reducer: Reducer<ItemsState> = (
  state = initialState,
  incomingAction: Action
): ItemsState => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ADD_ITEM:
      return { items: [...state.items, action.item] };
    case LOAD_ITEMS:
      return { ...state.items, items: action.items };
    case "EDIT_ITEM":
      return {
        items: [
          ...state.items.map((item) => {
            if (item.id === action.item.id) return { ...action.item };
            return item;
          }),
        ],
      };
    case "DELETE_ITEM":
      return {
        items: [...state.items.filter((item) => item.id !== action.itemId)],
      };
    default:
      return state;
  }
};
