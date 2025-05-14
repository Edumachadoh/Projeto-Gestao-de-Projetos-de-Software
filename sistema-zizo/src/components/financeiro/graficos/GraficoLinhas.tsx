import { Box, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React from "react";
import type { Relatorio } from "../../../models/Relatorio";
import NumToMonth from "../../../util/NumToMonth";

interface GraficoLinhasProps {
  selectedRows: Relatorio[];
}

const GraficoLinhas: React.FC<GraficoLinhasProps> = ({ selectedRows }) => {
  const chartSetting = {
    yAxis: [
      {
        label: "quantidade",
        width: 60,
      },
    ],
    height: 300,
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", paddingY: 4 }}>
      <Paper sx={{ margin: 3, padding: 2 }} elevation={5}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          <p>Gráfico dos {selectedRows.length > 1 ? "meses" : "mês de"}</p>
          <ul style={{ paddingLeft: "20px" }}>
            {selectedRows.map((datas) => (
              <li>
                {NumToMonth(datas.dataRegistrada.toString().split("-")[1])}{" "}
              </li>
            ))}
          </ul>
        </Typography>
        <BarChart
          dataset={selectedRows.map((relatorio) => ({
            data: new Date(relatorio.dataRegistrada).toLocaleDateString(),
            estoque: relatorio.estoque,
            funcionarios: relatorio.funcionarios,
            gas: relatorio.gas,
            itens: relatorio.itens,
            luz: relatorio.luz,
          }))}
          xAxis={[{ dataKey: "data" }]}
          series={[
            { dataKey: "estoque", label: "Estoque" },
            { dataKey: "funcionarios", label: "Funcionários" },
            { dataKey: "gas", label: "Gás" },
            { dataKey: "itens", label: "Itens" },
            { dataKey: "luz", label: "Luz" },
          ]}
          {...chartSetting}
        />
      </Paper>
    </Box>
  );
};

export default GraficoLinhas;
