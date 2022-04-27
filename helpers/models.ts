import { ICONS } from "./icons";
export interface Item extends IListable {
  name: string;
  partnerId: string;
  basePrice: string;
  sellPrice: string;
  qtty: string;
}

export interface Partner extends IListable {
  name: string;
  vatNumber: string;
  address: string;
}

export interface Sale extends IListable {
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
  isMoney?: boolean;
}

export interface IListable {
  id: string;
  isDeleted: boolean;
  [name: string]: string | boolean | Date | SaleItem[] | number;
}

export interface AlertModalProps {
  title: string;
  content: string;
  cancelBtnTxt: string;
  acceptBtnTxt: string;
  onAction: (itemId: string) => void;
}

export interface TableAction {
  name: ICONS;
  color: string;
  onPress: (item: IListable) => void;
}

export interface BuyItem {
  itemId: string;
  qtty: string;
  basePrice: string;
}

export interface UserDTO {
  username: string;
  password: string;
  email: string;
}
