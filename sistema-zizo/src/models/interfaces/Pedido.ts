import type { StatusPreparo } from "../enums/StatusPreparo";
import type { Cliente } from "./Cliente";
import type { Item } from "./Item";

export interface Pedido {
  id: number;
  clienteId?: number;
  valorTotal: number;
  data?: Date;
  statusPreparo: StatusPreparo;
  cliente?: Cliente;
  itens: Item[];
}
