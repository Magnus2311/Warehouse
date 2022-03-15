import React, { useState } from "react";
import { Pressable } from "react-native";
import { connect } from "react-redux";
import { Item } from "../helpers/models";
import { randomString } from "../helpers/randomFunctions";
import { normalize } from "../helpers/screenSizing";
import { AppState } from "../redux/store";
import Dropdown from "./dropdowns/Dropdown";
import { Input, Text, View } from "./Themed";

type Props = {
  items: Item[];
};

type SelectedItem = {
  uniqueId: string;
  id: string;
  name: string;
  qtty: number;
  price: number;
  total: number;
};

const EditableTable = ({ items }: Props) => {
  const [selectedItems, setSelectedItems] = useState([] as SelectedItem[]);
  const [itemsForDropdown] = useState(
    items.map(item => ({
      id: item.id,
      title: item.name,
    }))
  );

  return (
    <View
      style={{
        width: normalize(300),
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottomWidth: 2,
          borderBottomColor: "grey",
          backgroundColor: "none",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 5,
            justifyContent: "flex-start",
          }}
        >
          <Text>Име на стоката:</Text>
        </View>
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}
        >
          <Text>Количество:</Text>
        </View>
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
        >
          <Text>Цена:</Text>
        </View>
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
        >
          <Text>Общо сума:</Text>
        </View>
      </View>
      {selectedItems && (
        <>
          {selectedItems.map(selectedItem => {
            return (
              <View
                key={selectedItem.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: "grey",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 5,
                    alignSelf: "stretch",
                  }}
                >
                  <Dropdown
                    key={selectedItem.id}
                    selectedItem={{
                      id: selectedItem.id,
                      title: selectedItem.name,
                    }}
                    items={itemsForDropdown}
                    handleItemChosen={itemId => {
                      setTimeout(() => {
                        const currentItem = items.find(
                          item => item.id === itemId
                        )!;
                        setSelectedItems(
                          selectedItems.map(item => {
                            if (selectedItem.uniqueId === item.uniqueId)
                              return {
                                uniqueId: randomString(),
                                id: currentItem.id,
                                name: currentItem.name,
                                qtty: 1,
                                price: Number(currentItem.sellPrice),
                                total: Number(currentItem.sellPrice),
                              };

                            return item;
                          })
                        );
                      }, 300);
                    }}
                  />
                </View>
                <Input
                  autoFocus={true}
                  keyboardType="numeric"
                  style={{
                    textAlign: "center",
                    borderWidth: 0,
                    flexDirection: "row",
                    flex: 1,
                    alignSelf: "stretch",
                  }}
                  value={selectedItem.qtty.toString()}
                  onChangeText={text =>
                    setSelectedItems(
                      selectedItems.map(item => {
                        if (selectedItem.id === item.id) {
                          return {
                            ...item,
                            qtty: Number(text),
                            total: Number(text) * item.price,
                          };
                        }
                        return item;
                      })
                    )
                  }
                />
                <Input
                  style={{
                    textAlign: "center",
                    borderWidth: 0,
                    flexDirection: "row",
                    flex: 1,
                    alignSelf: "stretch",
                  }}
                  keyboardType="numeric"
                  value={selectedItem.price.toString()}
                  onChangeText={text =>
                    setSelectedItems(
                      selectedItems.map(item => {
                        if (selectedItem.uniqueId === item.uniqueId) {
                          return {
                            ...item,
                            price: Number(text),
                            total: item.qtty * Number(text),
                          };
                        }
                        return item;
                      })
                    )
                  }
                />
                <Text
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {selectedItem.total}
                </Text>
              </View>
            );
          })}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "grey",
            }}
          >
            <View style={{ flexDirection: "row", flex: 5 }}>
              <Dropdown
                items={itemsForDropdown}
                handleItemChosen={itemId => {
                  const currentItem = items.find(item => item.id === itemId)!;
                  setSelectedItems([
                    ...selectedItems,
                    {
                      uniqueId: randomString(),
                      id: currentItem.id,
                      name: currentItem.name,
                      qtty: 1,
                      price: Number(currentItem.sellPrice),
                      total: Number(currentItem.sellPrice),
                    },
                  ]);
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text></Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Text></Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Text></Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottomWidth: 2,
              borderBottomColor: "grey",
              backgroundColor: "none",
            }}
          >
            <View style={{ flexDirection: "row", flex: 6 }}>
              <Text></Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "flex-start",
              }}
            >
              <Text>Общо сума:</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Text>
                {selectedItems.length > 0
                  ? selectedItems
                      ?.map(item => item.total)
                      ?.reduce((a, b) => a + b)
                  : 0.0}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    items: state.items!.items,
  };
};

export default connect(mapStateToProps)(EditableTable);
