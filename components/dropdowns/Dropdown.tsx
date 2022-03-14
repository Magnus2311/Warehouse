import React, { FunctionComponent, useState } from "react";
import { Pressable, Text } from "react-native";
import { isAndroid, normalize } from "../../helpers/screenSizing";
import { LabeledInput, View } from "../Themed";

interface DropdownProps {
  items: {
    id: string,
    title: string
  }[];
  setIsOpened?: (isOpened: boolean) => void;
  handleItemChosen: (item: string) => void;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  items,
  handleItemChosen,
  setIsOpened
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [shownItems, setShownItems] = useState(items);

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
    setIsOpened && setIsOpened(true);
  };

  const handleInputChange = (e: string) => {
    setInputText(e);
    setShownItems(
      items.filter((item) => item.title.toLowerCase().includes(e.toLowerCase()))
    );
  };

  const handleItemClick = (item: {
    id: string,
    title: string
  }) => {
    setInputText(item.title);
    handleItemChosen(item.id);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
      setIsOpened && setIsOpened(false);
    }, 85);
  };

  return (
    <View
      style={{
        position: "relative",
        borderColor: "black"
      }}
    >
      <LabeledInput
        label="Име на партньора"
        onFocus={handleInputFocus}
        onBlur={handleOnBlur}
        value={inputText}
        onChangeText={handleInputChange}
      />
      <View
        style={{
          maxHeight: isDropdownOpen ? 200 : 0,
          top: 55,
          position: "absolute",
          overflow: "hidden",
          backgroundColor: "white",
          width: normalize(300),
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto"
        }}
      >
        <View style={{
          width: normalize(300),
          maxWidth: 500,
        }}>
          {shownItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              handleItemClick(item);
            }}
            style={{
              maxHeight: isDropdownOpen ? 25 : 0,
              paddingLeft: 12,
              backgroundColor: "white",
              height: 25,
            }}
          >
            <Text>{item.title}</Text>
          </Pressable>
        ))}</View>
      </View>
    </View>
  );
};

export default Dropdown;
