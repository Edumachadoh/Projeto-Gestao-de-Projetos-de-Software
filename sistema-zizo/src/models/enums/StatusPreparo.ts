const StatusPreparo = {
  AFazer: 0,
  Fazendo: 1,
  Feito: 2,
  Entregue: 3,
} as const;

export type StatusPreparo = keyof typeof StatusPreparo;
