import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { ModalContext } from "./components/contexts/ModalContext";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import configureStore from "./redux/configureStore";

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
      <SafeAreaProvider>
        <ModalContext.Provider value={value}>
          <Provider store={store}>
            <Navigation colorScheme={colorScheme} />
          </Provider>
        </ModalContext.Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
