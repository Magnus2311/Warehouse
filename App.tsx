import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { AlertsProvider } from "react-native-paper-alerts";
import { Provider as PaperProvider } from "react-native-paper";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import configureStore from "./redux/configureStore";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const store = configureStore();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PaperProvider>
            <AlertsProvider>
              <Navigation
                colorScheme={colorScheme}
                title={store.getState().title.title}
              />
            </AlertsProvider>
          </PaperProvider>
        </Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
