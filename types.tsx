/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReactNode } from "react";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Warehouse: undefined;
  Modal: { component: ReactNode | ReactNode[] };
  NotFound: undefined;
  PartnersListScreen: undefined;
  ItemsListScreen: undefined;
  SalesListScreen: undefined;
  Register: undefined;
  Login: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
