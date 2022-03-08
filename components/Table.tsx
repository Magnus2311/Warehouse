import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import { DataTable } from "react-native-paper";
import GestureRecognizer from "react-native-swipe-gestures";
import { Column, Item } from "../helpers/models";
import { normalize } from "../helpers/screenSizing";
import { FontAwesome } from "@expo/vector-icons";
import { Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddItemScreen from "../screens/AddItemScreen";

type RowProps = {
  columns: Column[];
};

type TableProps = {
  columns: Column[];
  data: any[];
};

const Table: FunctionComponent<TableProps> = ({ columns, data }) => {
  const [showAdditionalMenus, setShowAdditionalMenus] = useState("");
  const translateAnim = useRef(new Animated.Value(300)).current;
  const navigator = useNavigation();

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
          <GestureRecognizer
            onSwipeLeft={() => {
              translateAnim.setValue(300);
              setShowAdditionalMenus(item.id);
              Animated.timing(translateAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }).start();
            }}
            onSwipeRight={() => {
              Animated.timing(translateAnim, {
                toValue: 300,
                duration: 200,
                useNativeDriver: true,
              }).start(() => setShowAdditionalMenus(""));
            }}
          >
            <DataTable.Row key={item.id}>
              {columns.map((column) => {
                return (
                  <DataTable.Cell
                    key={column.name}
                    style={{
                      flex: column.flex ?? 1,
                    }}
                  >
                    {item[column.propName]}
                  </DataTable.Cell>
                );
              })}
              {showAdditionalMenus == item.id && (
                <Animated.View
                  style={{
                    alignSelf: "center",
                    flexDirection: "row",
                    transform: [{ translateX: translateAnim }],
                  }}
                >
                  <FontAwesome
                    name="edit"
                    key={item.id}
                    size={30}
                    color="green"
                    style={{
                      alignSelf: "center",
                      marginRight: 5,
                    }}
                    onPress={() => {
                      navigator.navigate("Modal", {
                        component: <AddItemScreen itemId={item.id} />,
                      });
                    }}
                  />
                  <FontAwesome
                    key={item.id}
                    name="remove"
                    size={30}
                    color="green"
                    style={{
                      alignSelf: "center",
                      marginLeft: 5,
                      paddingBottom: 4,
                    }}
                  />
                </Animated.View>
              )}
            </DataTable.Row>
          </GestureRecognizer>
        );
      })}
    </DataTable>
  );
};

export default Table;
