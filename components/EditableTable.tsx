import React, { useState } from "react";
import { textToDecimalFormat, toDecimalFormat } from "../helpers/extensions";
import { Item, Sale, SaleItem } from "../helpers/models";
import { randomString } from "../helpers/randomFunctions";
import {
  getHeight,
  isMobile,
  isMobileScreen,
  normalize,
  normalizeHeight,
} from "../helpers/screenSizing";
import Dropdown from "./dropdowns/Dropdown";
import { Input, Text, View } from "./Themed";

type Props = {
  items: Item[];
  saleItems: SaleItem[];
  setSelectedItems: (selectedItem: SaleItem[]) => void;
  sale: Sale;
};

const EditableTable = ({ items, saleItems, setSelectedItems, sale }: Props) => {
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    title: "",
  });
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
        height: getHeight() - 250,
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
          <Text style={{ margin: 0 }}>Име на стоката:</Text>
        </View>
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}
        >
          <Text>{isMobileScreen ? "К-во" : "Количество:"}</Text>
        </View>
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
        >
          <Text>{isMobileScreen ? "Цена" : "Цена:"}</Text>
        </View>
        <View
          style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
        >
          <Text>{isMobileScreen ? "Общо" : "Общо сума:"}</Text>
        </View>
      </View>
      {saleItems && (
        <>
          <View
            style={{
              height: isMobileScreen ? getHeight() - 400 : getHeight() - 290,
              overflow: "scroll",
            }}
          >
            {saleItems.map(selectedItem => {
              const isQttyEnough =
                Number(selectedItem.qtty) <=
                Number(
                  items.find(item => item.id === selectedItem.itemId)?.qtty
                );

              return (
                <View
                  key={selectedItem.itemId}
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
                      key={selectedItem.itemId}
                      selectedItem={{
                        id: selectedItem.itemId,
                        title: selectedItem.name,
                      }}
                      placeholder="Въведете име на стока"
                      items={itemsForDropdown}
                      handleItemChosen={itemId => {
                        setTimeout(() => {
                          const currentItem = items.find(
                            item => item.id === itemId
                          )!;
                          setSelectedItems(
                            saleItems.map(item => {
                              if (selectedItem.uniqueId === item.uniqueId)
                                return {
                                  id: "",
                                  uniqueId: randomString(),
                                  itemId: currentItem.id,
                                  name: currentItem.name,
                                  qtty: "1",
                                  price: currentItem.sellPrice,
                                  total: toDecimalFormat(
                                    Number(currentItem.sellPrice)
                                  ),
                                };

                              return item;
                            })
                          );
                        }, 300);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignSelf: "stretch",
                    }}
                  >
                    <Input
                      autoFocus={true}
                      keyboardType="numeric"
                      style={{
                        textAlign: "center",
                        borderWidth: isQttyEnough ? 0 : 1,
                        borderColor: isQttyEnough ? "white" : "red",
                        alignSelf: "stretch",
                        width: "100%",
                      }}
                      value={selectedItem.qtty.toString()}
                      onChangeText={text =>
                        setSelectedItems(
                          saleItems.map(item => {
                            if (selectedItem.uniqueId === item.uniqueId) {
                              return {
                                ...item,
                                qtty: text,
                                total: toDecimalFormat(
                                  Number(text) * Number(item.price)
                                ),
                              };
                            }
                            return item;
                          })
                        )
                      }
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignSelf: "stretch",
                    }}
                  >
                    <Input
                      style={{
                        textAlign: "center",
                        borderWidth: 0,
                        alignSelf: "stretch",
                        width: "100%",
                      }}
                      keyboardType="numeric"
                      value={selectedItem.price.toString()}
                      onChangeText={text =>
                        setSelectedItems(
                          saleItems.map(item => {
                            if (selectedItem.uniqueId === item.uniqueId) {
                              return {
                                ...item,
                                price: text,
                                total: toDecimalFormat(
                                  Number(item.qtty) * Number(text)
                                ),
                              };
                            }
                            return item;
                          })
                        )
                      }
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignSelf: "stretch",
                      width: "100%",
                    }}
                  >
                    <Text>{textToDecimalFormat(selectedItem.total)}</Text>
                  </View>
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
                  placeholder="Въведете име на стока"
                  selectedItem={selectedItem}
                  items={itemsForDropdown}
                  handleItemChosen={itemId => {
                    const currentItem = items.find(item => item.id === itemId)!;
                    setSelectedItems([
                      ...saleItems,
                      {
                        id: "",
                        uniqueId: randomString(),
                        itemId: currentItem.id,
                        name: currentItem.name,
                        qtty: "1",
                        price: currentItem.sellPrice,
                        total: toDecimalFormat(Number(currentItem.sellPrice)),
                      },
                    ]);

                    setSelectedItem({ id: "", title: "" });
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
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottomWidth: 2,
              borderBottomColor: "grey",
              backgroundColor: "none",
              height: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 6,
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ margin: 0 }}>Общо сума:</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "flex-end",
                paddingBottom: 7,
              }}
            >
              <Text>
                {toDecimalFormat(
                  saleItems.length > 0
                    ? saleItems
                        ?.map(item => Number(item.total))
                        ?.reduce((a, b) => a + b)
                    : 0.0
                )}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default EditableTable;
