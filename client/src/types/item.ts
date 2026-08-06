export interface Item {
  id: number;
  title: string;
}

export interface ItemsResponse {
  items: Item[];
  total: number;
}
