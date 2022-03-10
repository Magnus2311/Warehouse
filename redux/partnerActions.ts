import Toast from "react-native-toast-message";
import { Action, Reducer } from "redux";
import { API_PATH } from "../helpers/constants";
import { Partner } from "../helpers/models";
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

interface DeletePartnerAction {
  type: "DELETE_PARTNER";
  partnerId: string;
}

export type KnownAction =
  | AddPartnerAction
  | LoadPartnersAction
  | EditPartnerAction
  | DeletePartnerAction;

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

export const actionCreators = {
  onAddPartner: (partnerDTO: Partner): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      fetch(`${API_PATH}api/partners/`, {
        method: "POST",
        credentials: "omit",
        cache: "no-cache",
        body: JSON.stringify(partnerDTO),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((partner: Partner) => {
              dispatch(addPartner(partner));
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
  onLoadPartners: (): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      fetch(`${API_PATH}api/partners/`).then((response) => {
        if (response.ok) {
          response
            .json()
            .then((partners) => {
              dispatch(loadPartners(partners));
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    };
  },
  onEditPartner: (partnerDTO: Partner): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      fetch(`${API_PATH}api/partners/`, {
        method: "PUT",
        credentials: "omit",
        cache: "no-cache",
        body: JSON.stringify(partnerDTO),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) dispatch(editPartner(partnerDTO));
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
  onDeletePartner: (partnerId: string): AppThunk<void, KnownAction> => {
    return (dispatch: any) => {
      fetch(`${API_PATH}api/partners/`, {
        method: "DELETE",
        credentials: "omit",
        cache: "no-cache",
        body: JSON.stringify(partnerId),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) dispatch(deletePartner(partnerId));
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
