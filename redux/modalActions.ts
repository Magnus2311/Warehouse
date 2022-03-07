import { Action, Reducer } from "redux";
import { AppThunk } from "./store";

export interface ModalState {
  title: string;
}

export interface ChangeTitleAction {
  type: "CHANGE_TITLE";
  title: string;
}

export const changeTitle = (title: string): ChangeTitleAction => ({
  type: "CHANGE_TITLE",
  title,
});

export const actionCreators = {
  onTitleChange: (title: string): AppThunk<void, ChangeTitleAction> => {
    return (dispatch) => {
      dispatch<any>(changeTitle(title));
    };
  },
};

const initialState = {
  title: "",
};

export const reducer: Reducer<ModalState> = (
  state = initialState,
  incomingAction: Action
): ModalState => {
  const action = incomingAction as ChangeTitleAction;
  switch (action.type) {
    case "CHANGE_TITLE":
      return { title: action.title };
    default:
      return state;
  }
};
