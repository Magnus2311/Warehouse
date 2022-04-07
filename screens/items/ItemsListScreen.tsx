import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Page } from "../../components/Page";
import ItemsTable from "../../components/Table/types/classes/ItemsTable";
import { Item } from "../../helpers/models";
import { isMobile } from "../../helpers/screenSizing";
import { actionCreators } from "../../redux/itemActions";
import { AppState } from "../../redux/store";

interface Props {
  onItemsLoaded: () => void;
  items: Item[];
}

const ItemsListScreen: React.FunctionComponent<Props> = ({
  items,
  onItemsLoaded,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    onItemsLoaded();
  }, []);

  const columns = [
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
    {
      name: "К-во",
      propName: "qtty",
      flex: 1,
      isRight: true,
    },
  ];

  return (
    <Page>
      <ItemsTable
        columns={columns}
        listableItems={items}
        navigation={navigation}
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
