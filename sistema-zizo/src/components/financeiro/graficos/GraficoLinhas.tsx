import { Box, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React from "react";
import type { Relatorio } from "../../../models/interfaces/Relatorio";
import NumeroParaMes from "../../../util/NumeroParaMes";

interface GraficoLinhasProps {
  selectedRows: Relatorio[];
}

const GraficoLinhas: React.FC<GraficoLinhasProps> = ({
  selectedRows: linhasSelecionadas,
}) => {
  const configuracoesGrafico = {
    yAxis: [{ label: "Quantidade", width: 70 }],
    height: 350,
    width: 1000,
  };

  const dataset = linhasSelecionadas.map((relatorio) => ({
    data: new Date(relatorio.dataRegistrada).toLocaleDateString(),
    estoque: relatorio.estoque,
    funcionarios: relatorio.funcionarios,
    gas: relatorio.gas,
    itens: relatorio.itens,
    luz: relatorio.luz,
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
        }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Gráfico dos {linhasSelecionadas.length > 1 ? "meses" : "mês de"}:
        </Typography>

        <Box sx={{ textAlign: "center", marginBottom: 2 }}>
          {linhasSelecionadas.map((datas, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ display: "inline-block", marginRight: 1 }}>
              {NumeroParaMes(datas.dataRegistrada.toString().split("-")[1])}
            </Typography>
          ))}
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <BarChart
            dataset={dataset}
            xAxis={[{ dataKey: "data", label: "Data" }]}
            series={[
              { dataKey: "estoque", label: "Estoque" },
              { dataKey: "funcionarios", label: "Funcionários" },
              { dataKey: "gas", label: "Gás" },
              { dataKey: "itens", label: "Itens" },
              { dataKey: "luz", label: "Luz" },
            ]}
            {...configuracoesGrafico}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default GraficoLinhas;
