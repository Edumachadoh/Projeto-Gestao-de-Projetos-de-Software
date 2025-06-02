import React, { useState } from "react";
import type { StatusPreparo } from "../../models/enums/StatusPreparo";
import type { Cliente } from "../../models/interfaces/Cliente";
import ListarClientes from "../cliente/ListarClientes";
import ListarItens from "../item/ListarItens";
import type { Item } from "../../models/interfaces/Item";
import type { ItemSelecionado } from "../../models/interfaces/ItemSelecionado";
import NotaFiscal from "./NotaFiscal";

const CadastroPedido = () => {
  const [cliente, setCliente] = useState<Cliente>();
  const [itensSelecionados, setItensSelecionados] = useState<ItemSelecionado[]>(
    [],
  );
  const [itens, setItens] = useState<Item[]>([]);
  const [mostrarNota, setMostrarNota] = useState(false);

  function enviarPedido(e: React.FormEvent) {
    e.preventDefault();

    const pedido = {
      clienteId: cliente?.id || null,
      statusPreparo: 0 as StatusPreparo, // AFazer
      cliente: cliente || undefined,
      itens: itens,
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
      .then((dpedidoCadastrado) => {
        console.log("Pedido cadastrado", dpedidoCadastrado);
        alert("Pedido cadastrado com sucesso!");
        // Limpa o formulário
        setCliente(undefined);
        setItens([]);
      })
      .catch((erro) => {
        console.error("Erro ao cadastrar dpedido\n", erro);
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
        onVoltar={() => {
          setMostrarNota(false);
          setItensSelecionados([]);
          setCliente(undefined);
        }}
      />
    </>
  );
};

export default CadastroPedido;
