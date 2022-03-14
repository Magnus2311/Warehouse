import React, { FunctionComponent, useState } from "react";
import { Pressable, Text } from "react-native";
import { isAndroid, normalize } from "../../helpers/screenSizing";
import { Input, LabeledInput, View } from "../Themed";

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
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  items,
  handleItemChosen,
  selectedItem,
  label,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputText, setInputText] = useState(selectedItem?.title ?? "");
  const [shownItems, setShownItems] = useState(items);

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e: string) => {
    setInputText(e);
    setShownItems(
      items.filter((item) => item.title.toLowerCase().includes(e.toLowerCase()))
    );
  };

  const handleItemClick = (item: { id: string; title: string }) => {
    setInputText(item.title);
    handleItemChosen(item.id);
  };

  const handleOnBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 120);
  };

  return (
    <View
      style={{
        position: "relative",
        borderColor: "black",
      }}
    >
      {label ? (
        <LabeledInput
          label={label}
          onFocus={handleInputFocus}
          onBlur={handleOnBlur}
          value={inputText}
          onChangeText={handleInputChange}
        />
      ) : (
        <Input
          onFocus={handleInputFocus}
          onBlur={handleOnBlur}
          value={inputText}
          onChangeText={handleInputChange}
          style={{
            borderWidth: 0,
          }}
        />
      )}

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
          margin: "0 auto",
        }}
      >
        <View
          style={{
            width: normalize(300),
            maxWidth: 500,
          }}
        >
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
                zIndex: 15000,
              }}
            >
              <Text>{item.title}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Dropdown;
