// src/components/NotaFiscal.tsx
import React from "react";
import type { ItemSelecionado } from "../../models/interfaces/ItemSelecionado";

interface NotaFiscalProps {
  itensSelecionados: ItemSelecionado[];
  onVoltar: () => void;
}

const NotaFiscal: React.FC<NotaFiscalProps> = ({
  itensSelecionados,
  onVoltar,
}) => {
  const total = itensSelecionados.reduce(
    (acc, sel) => acc + sel.item.valor * sel.quantidade,
    0,
  );

  return (
    <div className="form-container">
      <h2>Nota Fiscal</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor Unitário</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {itensSelecionados.map((sel) => (
            <tr key={sel.item.id}>
              <td>{sel.item.id}</td>
              <td>{sel.item.nome}</td>
              <td>R$ {sel.item.valor.toFixed(2)}</td>
              <td>{sel.quantidade}</td>
              <td>R$ {(sel.item.valor * sel.quantidade).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4}>
              <strong>Total</strong>
            </td>
            <td>
              <strong>R$ {total.toFixed(2)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={onVoltar} className="table-input">
        Voltar
      </button>
    </div>
  );
};

export default NotaFiscal;
