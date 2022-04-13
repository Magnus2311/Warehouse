import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
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
  onItemRecovery: (itemId: string) => void;
  items: Item[];
  showDeleted: boolean;
  onShowDeletedChanged: (showDeleted: boolean) => void;
}

const ItemsListScreen: React.FunctionComponent<Props> = ({
  items,
  onItemsLoaded,
  onAllItemsLoaded,
  onItemRecovery,
  showDeleted,
  onShowDeletedChanged,
}) => {
  const navigation = useNavigation();

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
        showDeleted={{
          showDeleted,
          setShowDeleted: onShowDeletedChanged,
          recoverProps: {
            title: "Възстановяване на стока",
            content: "Желаете ли да възстановите избраната стока",
            cancelBtnTxt: "Отказ",
            acceptBtnTxt: "Възстановяване",
            onAction: onItemRecovery,
          },
        }}
      />
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    items: state.items!.items,
    showDeleted: state.items!.showDeleted,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onItemsLoaded: () => {
      dispatch(actionCreators.onLoadItems());
    },
    onItemRecovery: (itemId: string) => {
      dispatch(actionCreators.onItemRecovery(itemId));
    },
    onAllItemsLoaded: () => {
      dispatch(actionCreators.onLoadAllItems());
    },
    onShowDeletedChanged: (showDeleted: boolean) => {
      dispatch(actionCreators.setShowDeleted(showDeleted));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsListScreen);
