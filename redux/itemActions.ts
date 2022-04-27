import { Action, Reducer } from "redux";
import { BuyItem, Item } from "../helpers/models";
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
  showDeleted: boolean;
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

interface LoadAllItemsAction {
  type: "LOAD_ALL_ITEMS";
  items: Item[];
}

interface DeleteItemAction {
  type: "DELETE_ITEM";
  itemId: string;
}

interface BuyItemsAction {
  type: "BUY_ITEM";
  buyItem: BuyItem;
}

interface SetShowDeletedAction {
  type: "SET_SHOW_DELETED";
  showDeleted: boolean;
}

export type KnownAction =
  | AddItemAction
  | LoadItemsAction
  | LoadAllItemsAction
  | EditItemAction
  | DeleteItemAction
  | BuyItemsAction
  | SetShowDeletedAction;

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

export const loadAllItems = (items: Item[]): LoadAllItemsAction => ({
  type: "LOAD_ALL_ITEMS",
  items,
});

export const buyItem = (buyItem: BuyItem): BuyItemsAction => ({
  type: "BUY_ITEM",
  buyItem,
});

export const setShowDeleted = (showDeleted: boolean): SetShowDeletedAction => ({
  type: "SET_SHOW_DELETED",
  showDeleted,
});

export const actionCreators = {
  onAddItem: (itemDTO: Item): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      post<Item>("api/items/", itemDTO)
        .then((item) => {
          dispatch(addItem(item));
        })
        .catch((ex) => {
          console.log(ex);
        });
    };
  },
  onLoadItems: (): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      get<Item[]>("api/items/")
        .then((items) => {
          dispatch(loadItems(items));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  },
  onLoadAllItems: (): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      get<Item[]>("api/items/get-all")
        .then((items) => {
          dispatch(loadAllItems(items));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  },
  onEditItem: (itemDTO: Item): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      put<Item>("api/items/", itemDTO)
        .then((isUpdated) => {
          isUpdated && dispatch(editItem(itemDTO));
        })
        .catch((ex) => {
          console.log(ex);
        });
    };
  },
  onDeleteItem: (itemId: string): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      deletee("api/items/", itemId).then((isDeleted) => {
        isDeleted && dispatch(deleteItem(itemId));
      });
    };
  },
  onBuyItem: (item: BuyItem): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      post<BuyItem>("api/items/buy-item", item).then((item) => {
        dispatch(buyItem(item));
      });
    };
  },
  onItemRecovery: (itemId: string): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      post<Item>("api/items/item-recovery", itemId).then((item: Item) => {
        dispatch(editItem(item));
      });
    };
  },
  setShowDeleted: (showDeleted: boolean): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      dispatch(setShowDeleted(showDeleted));
    };
  },
};

const initialState = { items: [], showDeleted: false };

export const reducer: Reducer<ItemsState> = (
  state = initialState,
  incomingAction: Action
): ItemsState => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.item] };
    case LOAD_ITEMS:
      return { ...state, items: action.items };
    case "LOAD_ALL_ITEMS":
      return { ...state, items: action.items };
    case "EDIT_ITEM":
      return {
        ...state,
        items: [
          ...state.items.map((item) => {
            if (item.id === action.item.id) return { ...action.item };
            return item;
          }),
        ],
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.showDeleted
          ? [
              ...state.items.map((item) => {
                if (item.id === action.itemId)
                  return { ...item, isDeleted: true };
                return item;
              }),
            ]
          : [...state.items.filter((item) => item.id !== action.itemId)],
      };
    case "BUY_ITEM":
      return {
        ...state,
        items: [
          ...state.items.map((item) => {
            if (item.id === action.buyItem.itemId)
              return {
                ...item,
                qtty: (
                  Number(item.qtty) + Number(action.buyItem.qtty)
                ).toString(),
                basePrice: action.buyItem.basePrice,
              };
            return item;
          }),
        ],
      };
    case "SET_SHOW_DELETED":
      return {
        ...state,
        showDeleted: action.showDeleted,
      };
    default:
      return state;
  }
};
