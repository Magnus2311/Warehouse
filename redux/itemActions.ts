import Toast from "react-native-toast-message";
import { Action, Reducer } from "redux";
import { API_PATH } from "../helpers/constants";
import { Item } from "../helpers/models";
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

export type KnownAction = AddItemAction | LoadItemsAction | EditItemAction;

export const addItem = (item: Item): AddItemAction => ({
  type: ADD_ITEM,
  item,
});

export const editItem = (item: Item): EditItemAction => ({
  type: "EDIT_ITEM",
  item,
});

export const loadItems = (items: Item[]): LoadItemsAction => ({
  type: LOAD_ITEMS,
  items,
});

export const actionCreators = {
  onAddItem: (itemDTO: Item): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      fetch(`${API_PATH}api/items/`, {
        method: "POST",
        credentials: "omit",
        cache: "no-cache",
        body: JSON.stringify(itemDTO),
        headers: {
          "content-type": "application/json",
        },
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
  onLoadItems: (): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      fetch(`${API_PATH}api/items/`).then((response) => {
        if (response.ok) {
          response
            .json()
            .then((items) => {
              dispatch(loadItems(items));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    };
  },
  onEditItem: (itemDTO: Item): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      fetch(`${API_PATH}api/items/`, {
        method: "PUT",
        credentials: "omit",
        cache: "no-cache",
        body: JSON.stringify(itemDTO),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) dispatch(editItem(itemDTO));
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
    default:
      return state;
  }
};
