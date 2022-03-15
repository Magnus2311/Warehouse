import { Platform } from "react-native";

export const injectWebCss = () => {
  if (Platform.OS !== "web") return;

  const style = document.createElement("style");
  style.textContent = `textarea, select, input, button { outline: none !important; }`;
  style.textContent += `div::-webkit-scrollbar { width: 0; }`;
  return document.head.append(style);
};

injectWebCss();
