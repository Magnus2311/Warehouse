import React, { FunctionComponent, useState, useRef } from "react";
import { DataTable } from "react-native-paper";
import GestureRecognizer from "react-native-swipe-gestures";
import { Column } from "../helpers/models";
import { normalize } from "../helpers/screenSizing";
import { FontAwesome } from "@expo/vector-icons";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddItemScreen from "../screens/AddItemScreen";
import { actionCreators } from "../redux/itemActions";
import { connect } from "react-redux";
import { useAlerts } from "react-native-paper-alerts";
import { AlertsMethods } from "react-native-paper-alerts/lib/typescript/type";

type RowProps = {
  columns: Column[];
};

type TableProps = {
  columns: Column[];
  data: any[];
  onDeleteItem: (itemId: string) => void;
};

const Table: FunctionComponent<TableProps> = ({
  columns,
  data,
  onDeleteItem,
}) => {
  const [showAdditionalMenus, setShowAdditionalMenus] = useState("");
  const translateAnim = useRef(new Animated.Value(300)).current;
  const navigator = useNavigation();
  const alerts = useAlerts();

  const renderHeader: FunctionComponent<RowProps> = ({ columns }) => {
    return (
      <DataTable.Header>
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
      {data &&
        data.map((item) => {
          return (
            <GestureRecognizer
              key={item.id}
              onSwipeLeft={() => {
                if (item.id !== showAdditionalMenus) {
                  translateAnim.setValue(300);
                  setShowAdditionalMenus(item.id);
                  Animated.timing(translateAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                  }).start();
                }
              }}
              onSwipeRight={() => {
                Animated.timing(translateAnim, {
                  toValue: 300,
                  duration: 200,
                  useNativeDriver: true,
                }).start(() => setShowAdditionalMenus(""));
              }}
            >
              <DataTable.Row>
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
                    key={item.id}
                    style={{
                      alignSelf: "center",
                      flexDirection: "row",
                      transform: [{ translateX: translateAnim }],
                    }}
                  >
                    <FontAwesome
                      name="edit"
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
                        setShowAdditionalMenus("");
                      }}
                    />
                    <FontAwesome
                      name="remove"
                      size={30}
                      color="green"
                      style={{
                        alignSelf: "center",
                        marginLeft: 5,
                        paddingBottom: 4,
                      }}
                      onPress={() =>
                        createTwoButtonAlert(item.id, onDeleteItem, alerts)
                      }
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

const createTwoButtonAlert = (
  itemId: string,
  onDeleteItem: (itemId: string) => void,
  alerts: AlertsMethods
) =>
  alerts.alert(
    "Изтриване на стока",
    "Желаете ли да изтриете избраната стока?",
    [
      {
        text: "Отказ",
      },
      { text: "Изтриване", onPress: () => onDeleteItem(itemId) },
    ]
  );

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDeleteItem: (itemId: string) =>
      dispatch(actionCreators.onDeleteItem(itemId)),
  };
};

export default connect(null, mapDispatchToProps)(Table);
