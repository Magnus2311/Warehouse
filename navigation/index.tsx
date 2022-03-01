import { FontAwesome } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ItemsListScreen from "../screens/ItemsListScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { IconButton } from "react-native-paper";
import { useContext } from "react";
import { ModalContext } from "../components/contexts/ModalContext";
import { ModalTypes } from "../helpers/models";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { title } = useContext(ModalContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{
            title,
            headerTitleAlign: "center",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

function BottomTabNavigator({ navigation }: any) {
  const Drawer = createDrawerNavigator<RootStackParamList>();
  const { setTitle } = useContext(ModalContext);

  return (
    <Drawer.Navigator>
      <Drawer.Group>
        <Drawer.Screen
          name="ItemsList"
          component={ItemsListScreen}
          options={{
            title: "Списък със стоки",
            drawerLabel: "Списък със стоки",
            headerTitleAlign: "center",
            headerRight: () => (
              <IconButton
                icon="plus"
                size={30}
                onPress={(e) => {
                  e.preventDefault();
                  setTitle("Добавяне на стока");
                  navigation.navigate("Modal", {
                    component: ModalTypes.AddItemScreen,
                  });
                }}
              />
            ),
          }}
        />
      </Drawer.Group>
    </Drawer.Navigator>

    // <BottomTab.Navigator
    //   initialRouteName="TabOne"
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme].tint,
    //   }}
    // >
    //   <BottomTab.Screen
    //     name="TabOne"
    //     component={TabOneScreen}
    //     options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
    //       title: "Tab One",
    //       tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    //       headerRight: () => (
    //         <Pressable
    //           onPress={() => navigation.navigate("Modal")}
    //           style={({ pressed }) => ({
    //             opacity: pressed ? 0.5 : 1,
    //           })}
    //         >
    //           <FontAwesome
    //             name="info-circle"
    //             size={25}
    //             color={Colors[colorScheme].text}
    //             style={{ marginRight: 15 }}
    //           />
    //         </Pressable>
    //       ),
    //     })}
    //   />
    //   <BottomTab.Screen
    //     name="TabTwo"
    //     component={TabTwoScreen}
    //     options={{
    //       title: "Tab Two",
    //       tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
    //     }}
    //   />
    // </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
