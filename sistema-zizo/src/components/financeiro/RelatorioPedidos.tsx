import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
interface Pedido {
  id: number;
  clienteId: number;
  valorTotal: number;
  estaPago: boolean;
  estaAtivo: boolean;
  data: string;
  itens: {
    id: number;
    itemId: number;
    quantidade: number;
    pedidoId: number;
    item: {
      id: number;
      nome: string;
      valor: number;
    };
  }[];
}

const RelatorioPedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarPedidos = async () => {
      try {
        const resposta = await fetch("http://localhost:5190/api/pedidos");
        if (!resposta.ok) throw new Error("Erro ao carregar pedidos");
        const dados: Pedido[] = await resposta.json();
        setPedidos(dados);
      } catch (erro) {
        console.error("Erro ao carregar pedidos:", erro);
        alert("Erro ao carregar pedidos");
      } finally {
        setCarregando(false);
      }
    };

    carregarPedidos();
  }, []);

  if (carregando) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  const totalPedidos = pedidos.length;
  const pedidosPagos = pedidos.filter((p) => p.estaPago).length;
  const pedidosAtivos = pedidos.filter((p) => p.estaAtivo).length;
  const receitaTotal = pedidos
    .filter((p) => p.estaPago)
    .reduce((total, p) => total + p.valorTotal, 0);

  const mapaItens: Record<string, number> = {};
  pedidos.forEach((pedido) => {
    pedido.itens.forEach(({ item, quantidade }) => {
      mapaItens[item.nome] = (mapaItens[item.nome] || 0) + quantidade;
    });
  });

  const nomesItens = Object.keys(mapaItens);
  const quantidadesItens = Object.values(mapaItens);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Relatório de Pedidos
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Grid container spacing={2}>
          <Typography variant="h6">Total de Pedidos</Typography>
          <Typography variant="h4">{totalPedidos}</Typography>

          <Typography variant="h6">Pedidos Pagos</Typography>
          <Typography variant="h4">{pedidosPagos}</Typography>

          <Typography variant="h6">Pedidos Ativos</Typography>
          <Typography variant="h4">{pedidosAtivos}</Typography>

          <Typography variant="h6">Receita Total</Typography>
          <Typography variant="h4">R$ {receitaTotal.toFixed(2)}</Typography>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        <Box>
          <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Distribuição de Pagamento
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: pedidosPagos, label: "Pagos" },
                    {
                      id: 1,
                      value: totalPedidos - pedidosPagos,
                      label: "Não Pagos",
                    },
                  ],
                },
              ]}
              width={400}
              height={300}
            />
          </Paper>
        </Box>
        <Box>
          <Paper sx={{ p: 3 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Itens Mais Pedidos
            </Typography>
            <BarChart
              xAxis={[{ data: nomesItens, scaleType: "band" }]}
              series={[{ data: quantidadesItens, label: "Quantidade" }]}
              width={500}
              height={300}
            />
          </Paper>
        </Box>
      </Grid>
    </Container>
  );
};

export default RelatorioPedidos;
