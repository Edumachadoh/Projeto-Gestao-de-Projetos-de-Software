import type { StatusPreparo } from "../enums/StatusPreparo";
import type { Cliente } from "./Cliente";
import type { Item } from "./Item";

export interface Pedido {
  id: number;
  clienteId: number;
  valorTotal: number;
  statusPreparo: StatusPreparo;
  data: Date;
  cliente?: Cliente;
  itens: Item[];
}
