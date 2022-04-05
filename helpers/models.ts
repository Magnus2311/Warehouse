import { ICONS } from "./icons";

export interface Item {
  id: string;
  name: string;
  basePrice: string;
  sellPrice: string;
  qtty: string;
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
  qtty: string;
  price: string;
  total: string;
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

export interface TableAction {
  name: ICONS;
  color: string;
  onPress: (item: IListable) => void;
}
