import { Box, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import type { Relatorio } from "../../../models/interfaces/Relatorio";

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
  const configuracoesGrafico = {
    yAxis: [{ label: "Quantidade" }],
    height: 350,
    width: 1000,
  };

  const dadosColuna = rows.map((row) =>
    colunaSelecionada && colunaSelecionada in row
      ? Number(row[colunaSelecionada as keyof Relatorio])
      : 0,
  );

  const datas = rows.map((row) =>
    new Date(row.dataRegistrada).toLocaleDateString(),
  );

  return (
    <Box sx={{ width: "100%", paddingY: 4 }}>
      <Paper
        elevation={6}
        sx={{
          padding: 3,
          marginX: "auto",
          maxWidth: 1000,
          borderRadius: 4,
          backgroundColor: "#f9f9f9",
        }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          Gráfico de {colunaSelecionadaHeaderName}
        </Typography>

        <Box sx={{ overflowX: "auto", paddingTop: 2 }}>
          <BarChart
            xAxis={[
              {
                data: datas,
                label: "Data Registrada",
                scaleType: "band",
              },
            ]}
            series={[{ data: dadosColuna, label: colunaSelecionadaHeaderName }]}
            {...configuracoesGrafico}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default GraficoColuna;
