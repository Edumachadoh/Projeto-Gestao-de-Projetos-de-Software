import type { Item } from "./Item";

export interface ItemPedido {
  id?: number;
  itemId: number;
  quantidade: number;
  item: Item;
}
