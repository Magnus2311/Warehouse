import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { ReactNode } from "react";

export interface Item {
  id: string;
  name: string;
  basePrice: string;
  sellPrice: string;
}

export interface Column {
  name: string;
  propName: string;
  flex?: number;
  isRight?: boolean;
}
