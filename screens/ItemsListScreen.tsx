import { useEffect } from "react";
import { connect } from "react-redux";
import { Page } from "../components/Page";
import { Text } from "../components/Themed";
import { Item } from "../helpers/models";
import { actionCreators } from "../redux/itemActions";

import { AppState } from "../redux/store";

interface Props {
  onItemsLoaded: () => void;
  items: Item[];
}

const ItemsListScreen: React.FunctionComponent<Props> = ({
  items,
  onItemsLoaded,
}) => {
  useEffect(() => {
    onItemsLoaded();
  }, []);

  return (
    <Page title="Items List">
      {items.map((item) => {
        <Text>{item.name}</Text>;
      })}
    </Page>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onItemsLoaded: () => {
      dispatch(actionCreators.onLoadItems());
    },
  };
};

export default connect(
  (state: AppState) => state.items,
  mapDispatchToProps
)(ItemsListScreen);
