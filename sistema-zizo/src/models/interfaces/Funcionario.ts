import type { Cargo } from "../enums/Cargo";

export interface Funcionario {
  id?: number;
  cpf: string;
  senha: string;
  cargo: Cargo;
  nome: string;
  estaAtivo: boolean;
  salario: number;
  telefone?: string;
  status: number;
}
