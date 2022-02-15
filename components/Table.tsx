import { FunctionComponent } from "react";
import { Column } from "../helpers/models";
import { View } from "./Themed";

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
      <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
        {columns.map((column) => {
          <View>{column.name}</View>;
        })}
      </View>
    );
  };

  return (
    <View>
      {renderHeader({ columns })}
      {data.map((item) => {
        return (
          <View
            style={{
              flex: 1,
              alignSelf: "stretch",
              flexDirection: "row",
            }}
          >
            {columns.map((column) => {
              return <View>{item[column.name]}</View>;
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Table;
