import { FontAwesome } from "@expo/vector-icons";
import React, { FunctionComponent, useRef, useState } from "react";
import { Animated } from "react-native";
import { DataTable } from "react-native-paper";
import { useAlerts } from "react-native-paper-alerts";
import { AlertsMethods } from "react-native-paper-alerts/lib/typescript/type";
import GestureRecognizer from "react-native-swipe-gestures";
import { toDecimalFormat } from "../../helpers/extensions";
import {
  AlertModalProps,
  Column,
  IListable,
  TableAction,
} from "../../helpers/models";

type TableBodyProps = {
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

const MobileBody = ({
  columns,
  data,
  deleteProps,
  onEdit,
  additionalActions,
  showDeleted,
}: TableBodyProps) => {
  const [showAdditionalMenus, setShowAdditionalMenus] = useState("");
  const translateAnim = useRef(new Animated.Value(300)).current;
  const alerts = useAlerts();
  const createTwoButtonAlert = (
    itemId: string,
    alertProps: AlertModalProps,
    alerts: AlertsMethods
  ) =>
    alerts.alert(alertProps.title, alertProps.content, [
      {
        text: alertProps.cancelBtnTxt,
      },
      {
        text: alertProps.acceptBtnTxt,
        onPress: () => alertProps.onAction(itemId),
      },
    ]);

  return (
    <>
      {data &&
        data.map((item) => {
          return (
            (!showDeleted ||
              showDeleted.showDeleted ||
              (!showDeleted.showDeleted && !item.isDeleted)) && (
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
                    (onEdit ||
                      deleteProps ||
                      additionalActions ||
                      (showDeleted && item.isDeleted)) && (
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
                        {deleteProps && !item.isDeleted && (
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
                        {showDeleted && item.isDeleted && (
                          <FontAwesome
                            name="arrow-down"
                            size={30}
                            color="green"
                            style={{
                              alignSelf: "center",
                              paddingBottom: 4,
                            }}
                            onPress={() =>
                              createTwoButtonAlert(
                                item.id,
                                showDeleted.recoverProps,
                                alerts
                              )
                            }
                          />
                        )}
                      </Animated.View>
                    )}
                </DataTable.Row>
              </GestureRecognizer>
            )
          );
        })}
    </>
  );
};

export default MobileBody;
