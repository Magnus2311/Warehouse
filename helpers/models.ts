import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { ReactNode } from "react";

export interface Item {
  id: string;
  name: string;
  basePrice: string;
  sellPrice: string;
}

export interface Partner {
  id: string;
  name: string;
  vatNumber: string;
  address: string;
}

export interface Sale {
  id: string;
  date: Date;
  saleItems: SaleItem[];
  partnerId: string;
  description: string;
  totalAmount: number;
}

export interface SaleItem {
  id: string;
  uniqueId: string;
  name: string;
  qtty: number;
  price: number;
  total: number;
  itemId: string;
}

export interface Column {
  name: string;
  propName: string;
  flex?: number;
  isRight?: boolean;
}

export interface IListable {
  id: string;
}

export interface DeleteModalProps {
  title: string;
  content: string;
  onDelete: (itemId: string) => void;
}
