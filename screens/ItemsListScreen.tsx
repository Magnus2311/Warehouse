import { useEffect } from "react";
import { Platform } from "react-native";
import { connect } from "react-redux";
import { Page } from "../components/Page";
import Table from "../components/Table";
import { Item } from "../helpers/models";
import { isMobile } from "../helpers/screenSizing";
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
          { name: "Име на стока", propName: "name", flex: 6 },
          {
            name: isMobile ? "Д-на цена" : "Доставна цена",
            propName: "basePrice",
            flex: isMobile ? 2 : 1,
            isRight: true,
          },
          {
            name: isMobile ? "П-на цена" : "Продажна цена",
            propName: "sellPrice",
            flex: isMobile ? 2 : 1,
            isRight: true,
          },
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
