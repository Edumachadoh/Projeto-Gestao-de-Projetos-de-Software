import { Box, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import type { Relatorio } from "../../../models/Relatorio";

interface GraficoColunaProps {
  colunaSelecionada: string;
  colunaSelecionadaHeaderName: string;
  rows: Relatorio[];
}

const GraficoColuna: React.FC<GraficoColunaProps> = ({
  colunaSelecionada,
  colunaSelecionadaHeaderName,
  rows,
}) => {
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
          Gráfico de {colunaSelecionadaHeaderName}
        </Typography>
        <BarChart
          xAxis={[
            {
              data: rows.map((row) =>
                new Date(row.dataRegistrada).toLocaleDateString(),
              ),
            },
          ]}
          series={[
            {
              data: rows.map((row) =>
                Number(row[colunaSelecionada as keyof typeof row]),
              ),
            },
          ]}
          {...chartSetting}
        />
      </Paper>
    </Box>
  );
};

export default GraficoColuna;
