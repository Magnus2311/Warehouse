import React, { FunctionComponent } from "react";
import { DataTable } from "react-native-paper";
import {
  Column,
  AlertModalProps as AlertModalProps,
  IListable,
  TableAction,
} from "../../helpers/models";
import { isMobileScreen, normalize } from "../../helpers/screenSizing";
import {  Switch } from "react-native";
import MobileBody from "./MobileBody";
import TableBody from "./TableBody";

type RowProps = {
  columns: Column[];
};

type TableProps = {
  columns: Column[];
  data: IListable[];
  deleteProps?: AlertModalProps;
  onEdit?: (itemId: string) => void;
  additionalActions?: TableAction[];
  showDeleted?: {
    showDeleted: boolean;
    setShowDeleted: (showDeleted: boolean) => void;
    recoverProps: AlertModalProps;
  };
};

const Table: FunctionComponent<TableProps> = ({
  columns,
  data,
  deleteProps,
  onEdit,
  additionalActions,
  showDeleted,
}) => {
  const renderHeader: FunctionComponent<RowProps> = ({ columns }) => {
    return (
      <DataTable.Header>
        <>
          {columns &&
            columns.map((column) => {
              return (
                <DataTable.Title
                  key={column.name}
                  style={{ flex: column.flex ?? 1 }}
                >
                  {column.name}
                </DataTable.Title>
              );
            })}
          {showDeleted && (
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={showDeleted.showDeleted ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={showDeleted.setShowDeleted}
              style={{ alignSelf: "flex-end", marginBottom: 14 }}
              value={showDeleted.showDeleted}
            />
          )}
        </>
      </DataTable.Header>
    );
  };

  return (
    <DataTable
      style={{
        width: normalize(300),
      }}
    >
      {renderHeader({ columns })}
      {isMobileScreen ? (
        <MobileBody
          columns={columns}
          data={data}
          deleteProps={deleteProps}
          onEdit={onEdit}
          additionalActions={additionalActions}
          showDeleted={showDeleted}
        />
      ) : (
        <TableBody
          columns={columns}
          data={data}
          deleteProps={deleteProps}
          onEdit={onEdit}
          additionalActions={additionalActions}
          showDeleted={showDeleted}
        />
      )}
    </DataTable>
  );
};

export default Table;
