import { Action, Reducer } from "redux";
import { Partner } from "../helpers/models";
import {
  deletee,
  get,
  post,
  put,
} from "../services/communication/connectionService";
import { AppThunk } from "./store";

export interface PartnersState {
  partners: Partner[];
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

interface LoadAllPartnersAction {
  type: "LOAD_ALL_PARTNERS";
  partners: Partner[];
}

interface DeletePartnerAction {
  type: "DELETE_PARTNER";
  partnerId: string;
}

export type KnownAction =
  | AddPartnerAction
  | LoadPartnersAction
  | EditPartnerAction
  | DeletePartnerAction
  | LoadAllPartnersAction;

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

export const loadAllPartners = (
  partners: Partner[]
): LoadAllPartnersAction => ({
  type: "LOAD_ALL_PARTNERS",
  partners,
});

export const actionCreators = {
  onAddPartner: (partnerDTO: Partner): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      post<Partner>("api/partners/", partnerDTO)
        .then((partner) => {
          dispatch(addPartner(partner));
        })
        .catch((er) => console.log(er));
    };
  },
  onLoadPartners: (): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      get<Partner>("api/partners/")
        .then((partners) => {
          dispatch(loadPartners(partners));
        })
        .catch((er) => console.log(er));
    };
  },
  onLoadAllPartners: (): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      get<Partner>("api/partners/get-all")
        .then((partners) => {
          dispatch(loadPartners(partners));
        })
        .catch((er) => console.log(er));
    };
  },
  onEditPartner: (partnerDTO: Partner): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      put("api/partners/", partnerDTO).then(
        (isUpdated) => isUpdated && dispatch(editPartner(partnerDTO))
      );
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
};

const initialState = {
  partners: [],
};

export const reducer: Reducer<PartnersState> = (
  state = initialState,
  incomingAction: Action
): PartnersState => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "ADD_PARTNER":
      return { partners: [...state.partners, action.partner] };
    case "LOAD_PARTNERS":
      return { ...state.partners, partners: action.partners };
    case "LOAD_ALL_PARTNERS":
      return { ...state.partners, partners: action.partners };
    case "EDIT_PARTNER":
      return {
        partners: [
          ...state.partners.map((partner) => {
            if (partner.id === action.partner.id) return { ...action.partner };
            return partner;
          }),
        ],
      };
    case "DELETE_PARTNER":
      return {
        partners: [
          ...state.partners.filter(
            (partner) => partner.id !== action.partnerId
          ),
        ],
      };
    default:
      return state;
  }
};
