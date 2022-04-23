import { FontAwesome } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ItemsListScreen from "../screens/items/ItemsListScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Register from "../screens/authentication/Register";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { connect } from "react-redux";
import { ModalState } from "../redux/modalActions";
import AddItemScreen from "../screens/items/AddItemScreen";
import SalesListScreen from "../screens/sales/SalesListScreen";
import AddSaleScreen from "../screens/sales/AddSaleScreen";
import PartnersListScreen from "../screens/partners/PartnersListScreen";
import AddPartnerScreen from "../screens/partners/AddPartnerScreen";

type Props = {
  colorScheme: ColorSchemeName;
  title: string;
};

const Navigation: React.FunctionComponent<Props> = ({
  colorScheme,
  title,
}: Props) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator title={title} />
    </NavigationContainer>
  );
};

const mapStateToProps = (state: ModalState) => state.title;

export default connect(mapStateToProps, null)(Navigation);

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({ title }: { title: string }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Warehouse"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
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

function BottomTabNavigator({ navigation }: any) {
  const Drawer = createDrawerNavigator<RootStackParamList>();

  return (
    <Drawer.Navigator>
      <Drawer.Group>
        <Drawer.Screen
          name="SalesListScreen"
          component={SalesListScreen}
          options={{
            title: "Списък с продажби",
            headerTitleAlign: "center",
            headerRight: () => (
              <Pressable
                onPress={(e) => {
                  e.preventDefault();
                  navigation.navigate("Modal", {
                    component: <AddSaleScreen />,
                  });
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="plus-circle"
                  size={25}
                  color="green"
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ),
          }}
        />
        <Drawer.Screen
          name="ItemsListScreen"
          navigationKey="/ItemsListScreen"
          component={ItemsListScreen}
          options={{
            title: "Списък със стоки",
            headerTitleAlign: "center",
            headerRight: () => (
              <Pressable
                onPress={(e) => {
                  e.preventDefault();
                  navigation.navigate("Modal", {
                    component: <AddItemScreen />,
                  });
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="plus-circle"
                  size={25}
                  color="green"
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ),
          }}
        />
        <Drawer.Screen
          name="PartnersListScreen"
          navigationKey="PartnersListScreen"
          component={PartnersListScreen}
          options={{
            title: "Списък с партньори",
            headerTitleAlign: "center",
            headerRight: () => (
              <Pressable
                onPress={(e) => {
                  e.preventDefault();
                  navigation.navigate("Modal", {
                    component: <AddPartnerScreen />,
                  });
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="plus-circle"
                  size={25}
                  color="green"
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            ),
          }}
        />

        <Drawer.Screen name="Register" component={Register} />
      </Drawer.Group>
    </Drawer.Navigator>
  );
}
