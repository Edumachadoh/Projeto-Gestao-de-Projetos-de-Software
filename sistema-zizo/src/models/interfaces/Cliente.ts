import type { Pedido } from "./Pedido";

export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: Date;
  telefone: string;
  pontosFidelidade: number;
  pedidos: Pedido[];
}
