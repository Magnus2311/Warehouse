import React, { FunctionComponent, useState } from "react";
import { Pressable, Text, TextInput } from "react-native";
import { View } from "../Themed";

interface DropdownProps {
  items: string[];
  handleItemChosen: (item: string) => void;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  items,
  handleItemChosen,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [shownItems, setShownItems] = useState(items);

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e: string) => {
    setInputText(e);
    setShownItems(
      items.filter((item) => item.toLowerCase().includes(e.toLowerCase()))
    );
  };

  const handleItemClick = (item: string) => {
    setInputText(item);
    handleItemChosen(item);
  };

  const handleOnBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 50);
  };

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <TextInput
        onFocus={handleInputFocus}
        onBlur={handleOnBlur}
        value={inputText}
        onChangeText={handleInputChange}
      />
      <View
        style={{
          maxHeight: isDropdownOpen ? 200 : 0,
          position: "absolute",
          overflow: "hidden",
          zIndex: 10000,
          backgroundColor: "white",
          width: 100,
        }}
      >
        {shownItems.map((item, idx) => (
          <Pressable
            key={item + idx}
            onPress={() => {
              handleItemClick(item);
            }}
            style={{
              maxHeight: isDropdownOpen ? 38 : 0,
              paddingLeft: 12,
              backgroundColor: "white",
              zIndex: 10000,
              height: 38,
            }}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Dropdown;
