import { StatusBar } from "expo-status-bar";
import { createContext, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import configureStore from "./redux/configureStore";

export const ModalContext = createContext({
  title: "",
  setTitle: (title: string) => {},
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [title, setTitle] = useState("Modal");
  const value = { title, setTitle };

  const store = configureStore();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <ModalContext.Provider value={value}>
            <Navigation colorScheme={colorScheme} />
          </ModalContext.Provider>
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
