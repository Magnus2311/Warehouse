import { useEffect } from "react";
import { connect } from "react-redux";
import { Page } from "../components/Page";
import Table from "../components/Table";
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
    <Page>
      <Table
        data={items}
        columns={[
          { name: "Име на стока", propName: "name", flex: 5 },
          { name: "Доставна цена", propName: "basePrice", flex: 1 },
          { name: "Продажна цена", propName: "sellPrice", flex: 1 },
        ]}
      />
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return state.items;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onItemsLoaded: () => {
      dispatch(actionCreators.onLoadItems());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsListScreen);
