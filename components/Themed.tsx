/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useState } from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  TouchableOpacity,
} from "react-native";

import Colors from "../constants/Colors";
import { normalize } from "../helpers/screenSizing";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type DefaultLabeledInputProps = {
  label: string;
};

type DefaultButtonProps = {
  label: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type InputProps = ThemeProps & DefaultTextInput["props"];
export type ButtonProps = ThemeProps &
  DefaultButtonProps &
  TouchableOpacity["props"];
export type LabeledInputProps = ThemeProps &
  DefaultLabeledInputProps &
  DefaultTextInput["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function Header(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <Text {...props} style={{ top: "0px" }} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function PageContainer(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultView
      style={[{ backgroundColor, paddingTop: normalize(8) }, style]}
      {...otherProps}
    />
  );
}

export function Separator() {
  return (
    <View
      style={{
        marginVertical: 30,
        height: 1,
        width: "80%",
      }}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
  );
}

export function Input(props: InputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultTextInput
      style={[
        {
          color,
          borderColor: color,
          borderWidth: 1,
          width: normalize(300),
          maxWidth: 500,
          borderRadius: 5,
          padding: 3,
          paddingBottom: 5,
          paddingLeft: 5,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function Button(props: ButtonProps) {
  const { style, lightColor, darkColor, onPress, label, ...otherProps } = props;

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: "rgba(35, 134, 38, 0.9)",
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
          width: normalize(300),
          maxWidth: 500,
          alignItems: "center",
          marginTop: normalize(5),
          borderColor: "rgba(240,246,252,0.1)",
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={{ color: "white" }}>{label}</Text>
    </TouchableOpacity>
  );
}

export function LabeledInput(props: LabeledInputProps) {
  const { label } = props;

  return (
    <View
      style={[
        {
          width: normalize(300),
          marginBottom: 10,
          justifyContent: "center",
          alignItems: "center",
        },
        props.style,
      ]}
      {...props}
    >
      <View>
        <Text style={{ marginLeft: 1, marginBottom: 2 }} {...props}>
          {label}
        </Text>
        <Input {...props} />
      </View>
    </View>
  );
}
