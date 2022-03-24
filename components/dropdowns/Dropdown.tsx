import React, { FunctionComponent, useRef, useState } from "react";
import { Animated, Pressable, Text } from "react-native";
import { normalize } from "../../helpers/screenSizing";
import { Input, View } from "../Themed";

interface DropdownProps {
  items: {
    id: string;
    title: string;
  }[];
  selectedItem?: {
    id: string;
    title: string;
  };
  handleItemChosen: (itemId: string) => void;
  label?: string;
  border?: boolean;
  style?: {
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
  };
  placeholder: string;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  items,
  handleItemChosen,
  selectedItem,
  label,
  border,
  style,
  placeholder,
}) => {
  const [inputText, setInputText] = useState(selectedItem?.title ?? "");
  const [shownItems, setShownItems] = useState(items);
  const height = useRef(new Animated.Value(label ? 50 : 26.67)).current;
  const rowHeight = useRef(new Animated.Value(26.67)).current;
  const contentHeight = useRef(new Animated.Value(0)).current;

  const toggleDropdown = (isOpen: boolean) => {
    Animated.timing(height, {
      toValue: isOpen ? 250 : label ? 50 : 26.67,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(rowHeight, {
      toValue: isOpen ? 26.67 : 0,
      duration: isOpen ? 400 : 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(contentHeight, {
      toValue: isOpen ? 200 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleInputFocus = () => {
    toggleDropdown(true);
  };

  const handleInputChange = (e: string) => {
    setInputText(e);
    setShownItems(
      items.filter(item => item.title.toLowerCase().includes(e.toLowerCase()))
    );
  };

  const handleItemClick = (item: { id: string; title: string }) => {
    setInputText(item.title);
    handleItemChosen(item.id);
    if (selectedItem?.id === "") {
      setInputText("");
    }
  };

  const handleOnBlur = () => {
    setTimeout(() => toggleDropdown(false), 200);
  };

  return (
    <Animated.View
      style={{
        height: height,
        maxHeight: height,
        margin: style?.margin ?? 0,
        marginBottom: style?.marginBottom ?? 0,
        marginTop: style?.marginTop ?? 0,
      }}
    >
      <View
        style={{
          position: "relative",
          borderColor: "black",
          height: 23,
          alignSelf: "stretch",
        }}
      >
        <Input
          label={label}
          onFocus={handleInputFocus}
          onBlur={handleOnBlur}
          value={inputText}
          placeholder={placeholder}
          onChangeText={handleInputChange}
          style={{
            borderWidth: border ? 1 : 0,
          }}
        />

        <Animated.View
          style={{
            maxHeight: contentHeight,
            position: "relative",
            width: normalize(300),
            maxWidth: 500,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Animated.View
            style={{
              maxHeight: contentHeight,
              overflow: "scroll",
              alignSelf: "stretch",
            }}
          >
            {shownItems.map(item => (
              <Animated.View
                style={{
                  maxHeight: rowHeight,
                }}
              >
                <Pressable
                  key={item.id}
                  onPress={() => {
                    handleItemClick(item);
                  }}
                  style={{
                    paddingLeft: 12,
                    height: 25,
                  }}
                >
                  <Text>{item.title}</Text>
                </Pressable>
              </Animated.View>
            ))}
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default Dropdown;
