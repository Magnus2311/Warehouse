import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { connect } from "react-redux";
import { Item } from "../helpers/models";
import { normalize } from "../helpers/screenSizing";
import { AppState } from "../redux/store";
import Dropdown from "./dropdowns/Dropdown";
import { Input, View } from "./Themed";

type Props = {
  items: Item[];
};

type SelectedItem = {
  id: string;
  name: string;
  qtty: number;
  total: number;
};

const EditableTable = ({ items }: Props) => {
  const [selectedItems, setSelectedItems] = useState([] as SelectedItem[]);
  const [editingItem, setEditingItem] = useState({
    id: "",
    col: -1,
  } as {
    id: string;
    col: number;
  });

  const resetEditingItem = () => setEditingItem({ id: "", col: -1 });

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
        }}
      >
        <View style={{ flexDirection: "row", flex: 5 }}>
          <Text>Име на стоката</Text>
        </View>
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}
        >
          <Text>Количество</Text>
        </View>
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
        >
          <Text>Общо сума:</Text>
        </View>
      </View>

      {selectedItems && (
        <>
          {selectedItems.map((selectedItem) => {
            return (
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
                    selectedItem={{
                      id: selectedItem.id,
                      title: selectedItem.name,
                    }}
                    items={items.map((item) => ({
                      id: item.id,
                      title: item.name,
                    }))}
                    handleItemChosen={(itemId) => {
                      const currentItem = items.find(
                        (item) => item.id === itemId
                      )!;
                      setSelectedItems([
                        ...selectedItems,
                        {
                          id: currentItem.id,
                          name: currentItem.name,
                          qtty: 1,
                          total: Number(currentItem.sellPrice),
                        },
                      ]);
                    }}
                  />
                </View>
                <Pressable
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    setEditingItem({
                      id: selectedItem.id,
                      col: 1,
                    });
                  }}
                  onBlur={() => resetEditingItem()}
                >
                  {editingItem.id === selectedItem.id &&
                  editingItem.col === 1 ? (
                    <Input
                      value={selectedItem.qtty.toString()}
                      onChangeText={(text) =>
                        setSelectedItems([
                          ...selectedItems.filter((item) => {
                            if (item.id === editingItem.id) {
                              return { ...item, qtty: text };
                            }
                            return item;
                          }),
                        ])
                      }
                    />
                  ) : (
                    <Text>{selectedItem.qtty}</Text>
                  )}
                </Pressable>
                <Pressable
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <Text>{selectedItem.total}</Text>
                </Pressable>
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
                selectedItem={{
                  id: "",
                  title: "",
                }}
                items={items.map((item) => ({
                  id: item.id,
                  title: item.name,
                }))}
                handleItemChosen={(itemId) => {
                  const currentItem = items.find((item) => item.id === itemId)!;
                  setSelectedItems([
                    ...selectedItems,
                    {
                      id: currentItem.id,
                      name: currentItem.name,
                      qtty: 1,
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
              <Text>1</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Text>1</Text>
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
