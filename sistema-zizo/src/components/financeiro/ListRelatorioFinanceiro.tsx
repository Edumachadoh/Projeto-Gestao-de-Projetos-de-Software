import { useEffect, useState } from "react";
import type { Relatorio } from "../../models/Relatorio";
import { Button, Paper, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {
  ChartContainer,
  BarPlot,
  LinePlot,
  MarkPlot,
  ChartsXAxis,
} from "@mui/x-charts";

const ListRelatorioFinanceiro = () => {
  const [relatorioFinanceiro, setRelatorioFinanceiro] = useState<Relatorio[]>(
    [],
  );
  const [erro, setErro] = useState("");

  const [showEspGraphic, setShowEspGraphic] = useState(false);
  const [colunaSelecionada, setColunaSelecionada] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      setErro("");

      try {
        const response = await fetch(
          "http://localhost:5190/api/registros-financeiros",
        );

        if (!response.ok) {
          throw new Error("Relatórios não encontrados.");
        }

        const data = await response.json();
        setRelatorioFinanceiro(data);
      } catch (err: any) {
        setErro(err.message);
      }
    };

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", type: "number", width: 100 },
    {
      field: "dataRegistrada",
      headerName: "Data Registrada",
      type: "string",
      width: 200,
    },
    { field: "estoque", headerName: "Estoque", type: "number", width: 200 },
    {
      field: "funcionarios",
      headerName: "Funcionários",
      type: "number",
      width: 200,
    },
    { field: "gas", headerName: "Gás", type: "number", width: 200 },
    { field: "itens", headerName: "Itens", type: "number", width: 200 },
    { field: "luz", headerName: "Luz", type: "number", width: 200 },
  ];

  const rows = relatorioFinanceiro.map((relatorio: Relatorio) => ({
    id: relatorio.id,
    dataRegistrada: new Date(relatorio.dataRegistrada).toLocaleDateString(),
    estoque: relatorio.estoque,
    funcionarios: relatorio.funcionarios,
    gas: relatorio.gas,
    itens: relatorio.itens,
    luz: relatorio.luz,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  const generateData = () => {
    if (!colunaSelecionada) return [];
    return rows.map((row) =>
      Number(row[colunaSelecionada as keyof typeof row]),
    );
  };

  // Busca o headerName para exibir no título do gráfico
  const colunaSelecionadaHeaderName = columns.find(
    (col) => col.field === colunaSelecionada,
  )?.headerName;

  return (
    <div
      style={{
        margin: "0 auto",
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
        borderRadius: "10px",
      }}>
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          onColumnHeaderClick={(params) => {
            if (params.field !== "id" && params.field !== "dataRegistrada") {
              setColunaSelecionada(params.field); // agora guarda o field
              setShowEspGraphic(true);
            }
          }}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>

      {relatorioFinanceiro.length === 0 && (
        <p>Nenhum relatório encontrado. {erro}</p>
      )}

      {showEspGraphic && (
        <Box sx={{ width: "100%", overflow: "hidden", paddingY: 4 }}>
          <Button variant="contained" onClick={() => setShowEspGraphic(false)}>
            Fechar
          </Button>
          <Paper sx={{ margin: 3, padding: 2 }} elevation={5}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Gráfico de {colunaSelecionadaHeaderName}
            </Typography>
            <ChartContainer
              series={[{ type: "line", data: generateData() }]}
              xAxis={[
                {
                  data: rows.map((row) => row.dataRegistrada),
                  scaleType: "band",
                  id: "x-axis-id",
                  height: 45,
                },
              ]}>
              <BarPlot />
              <LinePlot />
              <MarkPlot />
              <ChartsXAxis label="Data" axisId="x-axis-id" />
            </ChartContainer>
          </Paper>
        </Box>
      )}
    </div>
  );
};

export default ListRelatorioFinanceiro;
