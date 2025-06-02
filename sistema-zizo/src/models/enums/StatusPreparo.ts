export const StatusPreparo = {
  AFazer: 0,
  Fazendo: 1,
  Feito: 2,
  Entregue: 3,
} as const;

export type StatusPreparo = (typeof StatusPreparo)[keyof typeof StatusPreparo];
