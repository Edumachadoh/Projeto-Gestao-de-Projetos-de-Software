import { useEffect, useState } from "react";
import type { Relatorio } from "../../models/Relatorio";
import { Paper } from "@mui/material";
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
        console.log(data);
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
      type: "number",
      width: 200,
    },
    { field: "estoque", headerName: "estoque", width: 200 },
    {
      field: "funcionarios",
      headerName: "Funcionarios",
      type: "number",
      width: 200,
    },
    {
      field: "gas",
      headerName: "Gas",
      type: "number",
      width: 200,
    },
    {
      field: "itens",
      headerName: "Itens",
      type: "number",
      width: 200,
    },
    {
      field: "luz",
      headerName: "Luz",
      type: "number",
      width: 200,
    },
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
        height: "90vh",
        borderRadius: "10px",
      }}>
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          rowSelection
          sx={{ border: 0 }}
        />
      </Paper>
      {relatorioFinanceiro.length === 0 && (
        <p>Nenhum relatório encontrado.{erro}</p>
      )}

      <Box sx={{ width: "100%", overflow: "hidden", paddingY: 4 }}>
        <Paper sx={{ margin: 3, height: 300 }} elevation={5}>
          <ChartContainer
            series={[
              {
                type: "bar",
                data: [1, 2, 3, 2, 1],
              },
            ]}
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
            <ChartsXAxis label="Mês" axisId="x-axis-id" />
          </ChartContainer>
        </Paper>
      </Box>
    </div>
  );
};

export default ListRelatorioFinanceiro;
