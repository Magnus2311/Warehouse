import React, { FunctionComponent, useState, useRef } from "react";
import { DataTable } from "react-native-paper";
import GestureRecognizer from "react-native-swipe-gestures";
import {
  Column,
  DeleteModalProps,
  IListable,
  TableAction,
} from "../../helpers/models";
import { normalize } from "../../helpers/screenSizing";
import { FontAwesome } from "@expo/vector-icons";
import { Animated, Switch } from "react-native";
import { useAlerts } from "react-native-paper-alerts";
import { AlertsMethods } from "react-native-paper-alerts/lib/typescript/type";
import { toDecimalFormat } from "../../helpers/extensions";

type RowProps = {
  columns: Column[];
};

type TableProps = {
  columns: Column[];
  data: IListable[];
  deleteProps?: DeleteModalProps;
  onEdit?: (itemId: string) => void;
  additionalActions?: TableAction[];
  showDeleted?: {
    showDeleted: boolean;
    setShowDeleted: (showDeleted: boolean) => void;
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
  const [showAdditionalMenus, setShowAdditionalMenus] = useState("");
  const translateAnim = useRef(new Animated.Value(300)).current;
  const alerts = useAlerts();

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
            <DataTable.Title>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={showDeleted.showDeleted ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={showDeleted.setShowDeleted}
                value={showDeleted.showDeleted}
              />
            </DataTable.Title>
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
              <DataTable.Row
                style={{
                  backgroundColor: item.isDeleted
                    ? "rgba(255, 0, 0, 0.05)"
                    : "white",
                }}
              >
                {columns.map((column) => {
                  return (
                    <DataTable.Cell
                      key={column.name}
                      style={{
                        flex: column.flex ?? 1,
                      }}
                    >
                      {column.isMoney
                        ? toDecimalFormat(Number(item[column.propName]))
                        : item[column.propName]}
                    </DataTable.Cell>
                  );
                })}
                {showAdditionalMenus == item.id &&
                  (onEdit || deleteProps || additionalActions) && (
                    <Animated.View
                      key={item.id}
                      style={{
                        alignSelf: "center",
                        flexDirection: "row",
                        transform: [{ translateX: translateAnim }],
                      }}
                    >
                      {additionalActions &&
                        additionalActions.map((action) => (
                          <FontAwesome
                            name={action.name}
                            size={30}
                            color={action.color}
                            style={{
                              alignSelf: "center",
                              marginRight: 10,
                            }}
                            onPress={() => {
                              action.onPress(item);
                              setShowAdditionalMenus("");
                            }}
                          />
                        ))}
                      {onEdit && (
                        <FontAwesome
                          name="edit"
                          size={30}
                          color="green"
                          style={{
                            alignSelf: "center",
                            marginRight: 10,
                          }}
                          onPress={() => {
                            onEdit(item.id);
                            setShowAdditionalMenus("");
                          }}
                        />
                      )}
                      {deleteProps && (
                        <FontAwesome
                          name="remove"
                          size={30}
                          color="green"
                          style={{
                            alignSelf: "center",
                            paddingBottom: 4,
                          }}
                          onPress={() =>
                            createTwoButtonAlert(item.id, deleteProps, alerts)
                          }
                        />
                      )}
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
  deleteProps: DeleteModalProps,
  alerts: AlertsMethods
) =>
  alerts.alert(deleteProps.title, deleteProps.content, [
    {
      text: "Отказ",
    },
    { text: "Изтриване", onPress: () => deleteProps.onDelete(itemId) },
  ]);

export default Table;
