import { useState } from "react";
import type { Pedido } from "../../models/interfaces/Pedido";
import { useParams } from "react-router";
import type { Item } from "../../models/interfaces/Item";
import type { Cliente } from "../../models/interfaces/Cliente";
import type { StatusPreparo } from "../../models/enums/StatusPreparo";

interface EditarPedidoProps {
  _pedido: Pedido;
  _id: number;
}

const EditarPedido: React.FC<EditarPedidoProps> = ({ _pedido, _id }) => {
  const [pedido, setPedido] = useState<Pedido>(_pedido);

  const [id, setId] = useState<number>(_id);
  const [clienteId, setClienteId] = useState<number>();
  const [valorTotal, setValorTotal] = useState<number>();
  const [statusPreparo, setStatusPreparo] = useState<StatusPreparo>();
  const [data, setData] = useState<Date>();
  const [cliente, setCliente] = useState<Cliente>();
  const [itens, setItens] = useState<Item[]>();

  function enviarFuncionario(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Editar Pedido</h2>
      </div>
      <form className="form-content" onSubmit={enviarFuncionario}>
        <div className="form-group"></div>
        <button type="submit" className="form-submit-button">
          Editar
        </button>
      </form>
    </div>
  );
};

export default EditarPedido;
