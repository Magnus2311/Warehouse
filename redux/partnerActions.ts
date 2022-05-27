import { Action, Reducer } from "redux";
import { Partner } from "../helpers/models";
import { getAccessToken } from "../screens/authentication/services/authenticationService";
import {
  deletee,
  get,
  post,
  put,
} from "../services/communication/connectionService";
import { AppThunk } from "./store";

export interface PartnersState {
  partners: Partner[];
  showDeleted: boolean;
}

interface AddPartnerAction {
  type: "ADD_PARTNER";
  partner: Partner;
}

interface EditPartnerAction {
  type: "EDIT_PARTNER";
  partner: Partner;
}

interface LoadPartnersAction {
  type: "LOAD_PARTNERS";
  partners: Partner[];
}

interface DeletePartnerAction {
  type: "DELETE_PARTNER";
  partnerId: string;
}

interface SetShowDeletedAction {
  type: "SET_SHOW_DELETED";
  showDeleted: boolean;
}

export type KnownAction =
  | AddPartnerAction
  | LoadPartnersAction
  | EditPartnerAction
  | DeletePartnerAction
  | SetShowDeletedAction;

export const addPartner = (partner: Partner): AddPartnerAction => ({
  type: "ADD_PARTNER",
  partner,
});

export const editPartner = (partner: Partner): EditPartnerAction => ({
  type: "EDIT_PARTNER",
  partner,
});

export const deletePartner = (partnerId: string): DeletePartnerAction => ({
  type: "DELETE_PARTNER",
  partnerId,
});

export const loadPartners = (partners: Partner[]): LoadPartnersAction => ({
  type: "LOAD_PARTNERS",
  partners,
});

export const setShowDeleted = (showDeleted: boolean): SetShowDeletedAction => ({
  type: "SET_SHOW_DELETED",
  showDeleted,
});

export const actionCreators = {
  onAddPartner: (partnerDTO: Partner): AppThunk<void, KnownAction> => {
    return async (dispatch: any) => {
      post<Partner>("api/partners/", {
        ...partnerDTO,
        accessToken: await getAccessToken(),
      })
        .then((partner) => {
          dispatch(addPartner(partner));
        })
        .catch((er) => console.log(er));
    };
  },
  onLoadPartners: (): AppThunk<void, KnownAction> => {
    return async (dispatch: any) => {
      get<Partner[]>(
        `api/partners/get-all?accessToken=${await getAccessToken()}`
      )
        .then((partners) => {
          if (partners && Array.isArray(partners))
            dispatch(loadPartners(partners));
        })
        .catch((er) => console.log(er));
    };
  },
  onEditPartner: (partnerDTO: Partner): AppThunk<void, KnownAction> => {
    return async (dispatch: any) => {
      put("api/partners/", {
        ...partnerDTO,
        accessToken: await getAccessToken(),
      }).then((isUpdated) => isUpdated && dispatch(editPartner(partnerDTO)));
    };
  },
  onDeletePartner: (partnerId: string): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      deletee("api/partners/", partnerId).then(
        (isDeleted) => isDeleted && dispatch(deletePartner(partnerId))
      );
    };
  },
  onPartnerRecovery: (partnerId: string): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      post<Partner>("api/partners/partner-recovery", partnerId).then(
        (sale: Partner) => {
          dispatch(editPartner(sale));
        }
      );
    };
  },
  setShowDeleted: (showDeleted: boolean): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      dispatch(setShowDeleted(showDeleted));
    };
  },
};

const initialState = {
  partners: [],
  showDeleted: false,
};

export const reducer: Reducer<PartnersState> = (
  state = initialState,
  incomingAction: Action
): PartnersState => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "ADD_PARTNER":
      return { ...state, partners: [...state.partners, action.partner] };
    case "LOAD_PARTNERS":
      return { ...state, partners: action.partners };
    case "EDIT_PARTNER":
      return {
        ...state,
        partners: [
          ...state.partners.map((partner) => {
            if (partner.id === action.partner.id) return { ...action.partner };
            return partner;
          }),
        ],
      };
    case "DELETE_PARTNER":
      return {
        ...state,
        partners: [
          ...state.partners.map((partner) => {
            if (partner.id === action.partnerId)
              return { ...partner, isDeleted: true };
            return partner;
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
