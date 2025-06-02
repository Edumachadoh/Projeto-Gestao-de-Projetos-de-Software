import React, { useState } from "react";
import type { Cliente } from "../../models/interfaces/Cliente";
import ListarClientes from "../cliente/ListarClientes";
import ListarItens from "../item/ListarItens";
import type { ItemSelecionado } from "../../models/interfaces/ItemSelecionado";
import NotaFiscal from "./NotaFiscal";
import type { Item } from "../../models/interfaces/Item";

const CadastroPedido = () => {
  const [cliente, setCliente] = useState<Cliente>();
  const [itensSelecionados, setItensSelecionados] = useState<ItemSelecionado[]>(
    [],
  );
  const [mostrarNota, setMostrarNota] = useState(false);

  function enviarPedido(e: React.FormEvent) {
    e.preventDefault();
    console.log("Enviando pedido...");

    // Expande os itens com base na quantidade (ex: 3 unidades → 3 entradas no array)
    const itensPedido: Item[] = itensSelecionados.flatMap((sel) =>
      Array.from({ length: sel.quantidade }, () => ({
        id: sel.item.id,
        nome: sel.item.nome,
        valor: sel.item.valor,
      })),
    );

    const valorTotal = itensSelecionados.reduce(
      (total, sel) => total + sel.item.valor * sel.quantidade,
      0,
    );

    const pedido = {
      clienteId: cliente?.id || null,
      estaAtivo: true,
      estaPago: false,
      valorTotal,
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
    cliente === undefined ? (
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
        }}
      />
      <button onClick={enviarPedido} className="table-select">
        Confirmar Pedido
      </button>
    </>
  );
};

export default CadastroPedido;
