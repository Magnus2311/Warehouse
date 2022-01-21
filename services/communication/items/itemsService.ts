import { Item } from "../../../helpers/models";
import { actionCreators } from "../../../redux/itemActions";

export const addItem = (item: Item): void => {
  actionCreators.onAddItem(item);
};
