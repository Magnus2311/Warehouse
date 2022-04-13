import { Action, Reducer } from "redux";
import { Sale } from "../helpers/models";
import {
  deletee,
  get,
  post,
  put,
} from "../services/communication/connectionService";
import { AppThunk } from "./store";

export interface SalesState {
  sales: Sale[];
  showDeleted: boolean;
}

interface AddSaleAction {
  type: "ADD_SALE";
  sale: Sale;
}

interface EditSaleAction {
  type: "EDIT_SALE";
  sale: Sale;
}

interface LoadSalesAction {
  type: "LOAD_SALES";
  sales: Sale[];
}

interface LoadAllSalesAction {
  type: "LOAD_ALL_SALES";
  sales: Sale[];
}

interface DeleteSaleAction {
  type: "DELETE_SALE";
  saleId: string;
}

interface SetShowDeletedAction {
  type: "SET_SHOW_DELETED";
  showDeleted: boolean;
}

export type KnownAction =
  | AddSaleAction
  | LoadSalesAction
  | EditSaleAction
  | DeleteSaleAction
  | LoadAllSalesAction
  | SetShowDeletedAction;

export const addSale = (sale: Sale): AddSaleAction => ({
  type: "ADD_SALE",
  sale,
});

export const editSale = (sale: Sale): EditSaleAction => ({
  type: "EDIT_SALE",
  sale,
});

export const deleteSale = (saleId: string): DeleteSaleAction => ({
  type: "DELETE_SALE",
  saleId,
});

export const loadSales = (sales: Sale[]): LoadSalesAction => ({
  type: "LOAD_SALES",
  sales,
});

export const loadAllSales = (sales: Sale[]): LoadAllSalesAction => ({
  type: "LOAD_ALL_SALES",
  sales,
});

export const setShowDeleted = (showDeleted: boolean): SetShowDeletedAction => ({
  type: "SET_SHOW_DELETED",
  showDeleted,
});

export const actionCreators = {
  onAddSale: (saleDTO: Sale): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      post<Sale>("api/sales/", saleDTO)
        .then((sale) => {
          dispatch(addSale(sale));
        })
        .catch((ex) => {
          console.log(ex);
        });
    };
  },
  onLoadSales: (): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      get<Sale>("api/sales/")
        .then((sales) => {
          dispatch(loadSales(sales));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  },
  onLoadAllSales: (): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      get<Sale>("api/sales/get-all")
        .then((sales) => {
          dispatch(loadSales(sales));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  },
  onEditSale: (saleDTO: Sale): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      put<Sale>("api/sales/", saleDTO)
        .then((isUpdated) => {
          isUpdated && dispatch(editSale(saleDTO));
        })
        .catch((ex) => {
          console.log(ex);
        });
    };
  },
  onDeleteSale: (saleId: string): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      deletee("api/sales/", saleId).then((isDeleted) => {
        isDeleted && dispatch(deleteSale(saleId));
      });
    };
  },
  onSaleRecovery: (saleId: string): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      post<Sale>("api/sales/sale-recovery", saleId).then((sale: Sale) => {
        dispatch(editSale(sale));
      });
    };
  },
  setShowDeleted: (showDeleted: boolean): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      dispatch(setShowDeleted(showDeleted));
    };
  },
};

const initialState = {
  sales: [],
  showDeleted: false,
};

export const reducer: Reducer<SalesState> = (
  state = initialState,
  incomingAction: Action
): SalesState => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "ADD_SALE":
      return { ...state, sales: [...state.sales, action.sale] };
    case "LOAD_SALES":
      return { ...state, sales: action.sales };
    case "LOAD_ALL_SALES":
      return { ...state, sales: action.sales };
    case "EDIT_SALE":
      return {
        ...state,
        sales: [
          ...state.sales.map((sale) => {
            if (sale.id === action.sale.id) return { ...action.sale };
            return sale;
          }),
        ],
      };
    case "DELETE_SALE":
      return {
        ...state,
        sales: state.showDeleted
          ? [
              ...state.sales.map((sale) => {
                if (sale.id === action.saleId)
                  return { ...sale, isDeleted: true };
                return sale;
              }),
            ]
          : [...state.sales.filter((sale) => sale.id !== action.saleId)],
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
