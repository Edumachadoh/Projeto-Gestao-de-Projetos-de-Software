import { Box, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React from "react";
import type { Produto } from "../../../models/interfaces/Produto";

interface GraficoLinhasProps {
  selectedRows: Produto[];
}

const GraficoLinhas: React.FC<GraficoLinhasProps> = ({ selectedRows }) => {
  const configuracoesGrafico = {
    yAxis: [{ label: "Quantidade", width: 70 }],
    height: 350,
    width: 1000,
  };

  const dataset = selectedRows.map((produto) => ({
    nome: produto.nome,
    qtdMinima: produto.qtdMinima,
    qtdMaxima: produto.qtdMaxima,
    qtdAtual: produto.qtdAtual,
  }));

  return (
    <Box sx={{ width: "100%", paddingY: 4 }}>
      <Paper
        elevation={6}
        sx={{
          marginX: "auto",
          maxWidth: 1000,
          padding: 3,
          borderRadius: 4,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          Gráfico dos Produtos Selecionados
        </Typography>

        <Box sx={{ overflowX: "auto" }}>
          <BarChart
            dataset={dataset}
            xAxis={[{ dataKey: "nome", label: "Produto" }]}
            series={[
              { dataKey: "qtdMinima", label: "Qtd. Mínima" },
              { dataKey: "qtdMaxima", label: "Qtd. Máxima" },
              { dataKey: "qtdAtual", label: "Qtd. Atual" },
            ]}
            {...configuracoesGrafico}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default GraficoLinhas;
