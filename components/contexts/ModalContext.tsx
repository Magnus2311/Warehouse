import { createContext } from "react";

export const ModalContext = createContext({
  title: "",
  setTitle: (title: string) => {},
});
