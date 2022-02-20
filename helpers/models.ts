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
}
