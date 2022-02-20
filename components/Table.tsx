import { FunctionComponent } from "react";
import { DataTable } from "react-native-paper";
import { Column } from "../helpers/models";
import { normalize } from "../helpers/screenSizing";

type RowProps = {
  columns: Column[];
};

type TableProps = {
  columns: Column[];
  data: any[];
};

const Table: FunctionComponent<TableProps> = ({ columns, data }) => {
  const renderHeader: FunctionComponent<RowProps> = ({ columns }) => {
    return (
      <DataTable.Header>
        {columns.map((column) => {
          return (
            <DataTable.Title
              key={column.name}
              style={{ flex: column.flex ?? 1 }}
            >
              {column.name}
            </DataTable.Title>
          );
        })}
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
      {data.map((item) => {
        return (
          <DataTable.Row key={item.id}>
            {columns.map((column) => {
              return (
                <DataTable.Cell
                  key={column.name}
                  style={{ flex: column.flex ?? 1 }}
                >
                  {item[column.propName]}
                </DataTable.Cell>
              );
            })}
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
};

export default Table;
