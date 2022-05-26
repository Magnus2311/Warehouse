import { FontAwesome } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { connect } from "react-redux";
import { AppState } from "../redux/store";
import Login from "../screens/authentication/pages/Login";
import Register from "../screens/authentication/pages/Register";
import { UserState } from "../screens/authentication/redux/userActions";
import AddItemScreen from "../screens/items/AddItemScreen";
import ItemsListScreen from "../screens/items/ItemsListScreen";
import AddPartnerScreen from "../screens/partners/AddPartnerScreen";
import PartnersListScreen from "../screens/partners/PartnersListScreen";
import AddSaleScreen from "../screens/sales/AddSaleScreen";
import SalesListScreen from "../screens/sales/SalesListScreen";
import { RootStackParamList } from "../types";

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user,
  };
};

interface Props {
  user: UserState;
}

const BottomTabNavigator: FunctionComponent<Props> = ({ user }) => {
  const Drawer = createDrawerNavigator<RootStackParamList>();
  const navigation = useNavigation();
  const [isAuthenticatedState, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(
      (user.username !== undefined && user.username !== "") ||
        (user.email !== undefined && user.email !== "")
    );
  });

  return (
    <Drawer.Navigator>
      <Drawer.Group>
        {isAuthenticatedState ? (
          <>
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
          </>
        ) : (
          <>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Register" component={Register} />
          </>
        )}
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export default connect(mapStateToProps)(BottomTabNavigator);
