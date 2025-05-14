export const Cargo = {
    Administrador: 0,
    Cozinha: 1,
    Gerente: 2,
    Balconista: 3
} as const;

export type Cargo = typeof Cargo[keyof typeof Cargo];