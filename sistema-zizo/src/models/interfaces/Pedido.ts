import type { Cliente } from "./Cliente";
import type { Item } from "./Item";
import type { ItemPedido } from "./ItemPedido";

export interface Pedido {
  id: number;
  clienteId?: number;
  valorTotal: number;
  data?: Date;
  estaAtivo: boolean;
  estaPago: boolean;
  cliente?: Cliente;
  itens: ItemPedido[];
}
