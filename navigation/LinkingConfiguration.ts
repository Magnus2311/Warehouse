/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/Warehouse/")],
  config: {
    screens: {
      Root: {
        screens: {
          SalesListScreen: {
            screens: {
              SalesListScreen: "*",
            },
          },
        },
      },
      ItemsListScreen: "ItemsListScreen",
      PartnersListScreen: "PartnersListScreen",
      Register: "Register",
      Modal: "modal",
    },
  },
};

export default linking;
