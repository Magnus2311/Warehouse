import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Page } from "../../components/Page";
import ItemsTable from "../../components/Table/types/classes/ItemsTable";
import { Column, Item } from "../../helpers/models";
import { isMobile } from "../../helpers/screenSizing";
import { actionCreators } from "../../redux/itemActions";
import { AppState } from "../../redux/store";

interface Props {
  onItemsLoaded: () => void;
  onAllItemsLoaded: () => void;
  items: Item[];
}

const ItemsListScreen: React.FunctionComponent<Props> = ({
  items,
  onItemsLoaded,
  onAllItemsLoaded,
}) => {
  const navigation = useNavigation();

  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    showDeleted ? onAllItemsLoaded() : onItemsLoaded();
  }, [showDeleted]);

  const columns = [
    { name: "Име на стока", propName: "name", flex: 6 },
    {
      name: isMobile ? "Д-на цена" : "Доставна цена",
      propName: "basePrice",
      flex: isMobile ? 2 : 1,
      isRight: true,
      isMoney: true,
    },
    {
      name: isMobile ? "П-на цена" : "Продажна цена",
      propName: "sellPrice",
      flex: isMobile ? 2 : 1,
      isRight: true,
      isMoney: true,
    },
    {
      name: "К-во",
      propName: "qtty",
      flex: 1,
      isRight: true,
      isMoney: true,
    },
  ] as Column[];

  return (
    <Page>
      <ItemsTable
        columns={columns}
        listableItems={items}
        navigation={navigation}
        showDeleted={{ showDeleted, setShowDeleted }}
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
    onAllItemsLoaded: () => {
      dispatch(actionCreators.onLoadAllItems());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsListScreen);
