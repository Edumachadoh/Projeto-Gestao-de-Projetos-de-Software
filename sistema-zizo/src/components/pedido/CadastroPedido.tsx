import React, { useState } from "react";
import type { Cliente } from "../../models/interfaces/Cliente";
import ListarClientes from "../cliente/ListarClientes";
import ListarItens from "../item/ListarItens";
import NotaFiscal from "./NotaFiscal";
import type { ItemPedido } from "../../models/interfaces/ItemPedido";
import type { ItemSelecionado } from "../../models/interfaces/ItemSelecionado";

const CadastroPedido = () => {
  const [cliente, setCliente] = useState<Cliente>();
  const [selecionado, setSelecionado] = useState<boolean>(false);
  const [itensSelecionados, setItensSelecionados] = useState<ItemSelecionado[]>(
    [],
  );
  const [mostrarNota, setMostrarNota] = useState(false);

  function enviarPedido(e: React.FormEvent) {
    e.preventDefault();

    const itensPedido: ItemPedido[] = itensSelecionados.map((sel) => ({
      itemId: sel.item.id,
      quantidade: sel.quantidade,
    }));

    const valorTotal = itensSelecionados.reduce(
      (total, sel) => total + sel.item.valor * sel.quantidade,
      0,
    );

    const pedido = {
      clienteId: cliente?.id || null,
      valorTotal: valorTotal,
      estaAtivo: true,
      estaPago: false,
      itens: itensPedido,
    };

    fetch("http://localhost:5190/api/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    })
      .then(async (resposta) => {
        if (!resposta.ok) {
          const erro = await resposta
            .json()
            .catch(() => ({ message: "Erro desconhecido" }));
          throw new Error(erro.message || "Erro ao cadastrar");
        }
        return resposta.json();
      })
      .then((pedidoCadastrado) => {
        console.log("Pedido cadastrado", pedidoCadastrado);
        alert("Pedido cadastrado com sucesso!");
        setCliente(undefined);
        setItensSelecionados([]);
        setMostrarNota(false);
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar pedido\n", erro);
        alert(`Erro: ${erro.message}`);
      });
  }
  return !mostrarNota ? (
    !selecionado ? (
      <div className="form-container">
        <div className="form-content">
          <h1>
            Por favor, selecione um cliente para continuar com o cadastro do
            pedido.
          </h1>
          <ListarClientes
            modoSelecao={true}
            onSelecionarCliente={(clienteSelecionado) => {
              setCliente(clienteSelecionado);
              setSelecionado(true);
            }}
          />
        </div>
      </div>
    ) : (
      <div className="form-container">
        <div className="form-header">
          <h2>Cadastro de Pedido</h2>
        </div>
        <ListarItens
          modoSelecao={true}
          itensSelecionados={itensSelecionados}
          aoSelecionarItens={setItensSelecionados}
        />
        <>
          <button className="table-select" onClick={() => setMostrarNota(true)}>
            Enviar Pedido
          </button>
        </>
      </div>
    )
  ) : (
    <>
      <NotaFiscal
        itensSelecionados={itensSelecionados}
        cliente={cliente}
        onVoltar={() => {
          setMostrarNota(false);
          setItensSelecionados([]);
          setCliente(undefined);
          setSelecionado(false);
        }}
      />
      <button onClick={enviarPedido} className="table-select">
        Confirmar Pedido
      </button>
    </>
  );
};

export default CadastroPedido;
