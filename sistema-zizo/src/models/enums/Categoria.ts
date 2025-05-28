const Categoria = {
  ProdutoEstoque: 0,
  Item: 1,
} as const;

export type Categoria = keyof typeof Categoria;
