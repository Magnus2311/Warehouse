import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { AlertModalProps, Column, IListable } from "../../../../helpers/models";
import { RootStackParamList } from "../../../../types";

type TableModelProps = {
  columns: Column[];
  listableItems: IListable[];
  dispatch: any;
  navigation: NavigationProp<RootStackParamList>;
  showDeleted?: {
    showDeleted: boolean;
    setShowDeleted: (showDeleted: boolean) => void;
    recoverProps: AlertModalProps;
  };
};

export default abstract class TableModel extends React.Component<TableModelProps> {
  public abstract onEdit: (listableId: string) => void;
  public abstract onDelete: (listableId: string) => void;
}
