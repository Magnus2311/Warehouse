import { FontAwesome } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import ItemsListScreen from "../screens/ItemsListScreen";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { ModalTypes } from "../helpers/models";
import Register from "../screens/authentication/Register";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { connect } from "react-redux";
import { ModalState } from "../redux/modalActions";

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

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({ title }: { title: string }) {
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

function BottomTabNavigator({ navigation }: any) {
  const Drawer = createDrawerNavigator<RootTabParamList>();

  return (
    <Drawer.Navigator>
      <Drawer.Group>
        <Drawer.Screen
          name="ItemsListScreen"
          component={ItemsListScreen}
          options={{
            title: "Списък със стоки",
            headerTitleAlign: "center",
            headerRight: () => (
              <Pressable
                onPress={(e) => {
                  e.preventDefault();
                  navigation.navigate("Modal", {
                    component: ModalTypes.AddItemScreen,
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
