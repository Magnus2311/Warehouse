import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import ModalScreen from "../screens/ModalScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { connect } from "react-redux";
import { ModalState } from "../redux/modalActions";
import BottomTabNavigator from "./BottomTabNavigator";
import {
  actionCreators,
  UserState,
} from "../screens/authentication/redux/userActions";
import { initUser } from "../screens/authentication/services/authenticationService";

type Props = {
  colorScheme: ColorSchemeName;
  title: string;
  onInitUser: (user: UserState) => void;
};

const Navigation: React.FunctionComponent<Props> = ({
  colorScheme,
  title,
  onInitUser,
}: Props) => {
  React.useEffect(() => {
    const getUserData = async () => {
      const userData = await initUser();
      onInitUser(userData);
    };
    getUserData();
  }, []);
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    onInitUser: (user: UserState) => {
      dispatch(actionCreators.initUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

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
