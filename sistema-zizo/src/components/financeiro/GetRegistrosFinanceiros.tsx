import { useEffect, useState } from "react";
import type { Relatorio } from "../../models/interfaces/Relatorio";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import GraficoLinhas from "./graficos/GraficoLinhas";
import GraficoColuna from "./graficos/GraficoColuna";

const GetRegistrosFinanceiros = () => {
  const [relatorioFinanceiro, setRelatorioFinanceiro] = useState<Relatorio[]>(
    [],
  );
  const [erro, setErro] = useState("");
  const [mostrarGraficoLinhas, setMostrarGraficoLinhas] = useState(false);
  const [mostrarGraficoColuna, setMostrarGraficoColuna] = useState(false);
  const [colunaSelecionada, setColunaSelecionada] = useState<string | null>(
    null,
  );
  const [linhasSelecionadas, setLinhasSelecionadas] = useState<Relatorio[]>([]);

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
    { field: "id", headerName: "ID", type: "number" },
    { field: "dataRegistrada", headerName: "Data", type: "string" },
    { field: "estoque", headerName: "Estoque", type: "number" },
    { field: "funcionarios", headerName: "Funcionários", type: "number" },
    { field: "gas", headerName: "Gás", type: "number" },
    { field: "itens", headerName: "Itens", type: "number" },
    { field: "luz", headerName: "Luz", type: "number" },
  ];

  const rows = relatorioFinanceiro.map((relatorio) => ({
    id: relatorio.id,
    dataRegistrada: new Date(relatorio.dataRegistrada).toLocaleDateString(),
    estoque: relatorio.estoque,
    funcionarios: relatorio.funcionarios,
    gas: relatorio.gas,
    itens: relatorio.itens,
    luz: relatorio.luz,
  }));

  const selectedLinesHeaderName = columns.find(
    (col) => col.field === colunaSelecionada,
  )?.headerName;

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Relatórios Financeiros
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(selectionModel) => {
            const idsArray = Array.from(selectionModel.ids ?? []);
            const numericIds = idsArray.map((id) => Number(id));
            const selectedData = relatorioFinanceiro.filter((relatorio) =>
              numericIds.includes(relatorio.id),
            );
            setLinhasSelecionadas(selectedData);
            setMostrarGraficoLinhas(selectedData.length > 0);
          }}
          onColumnHeaderClick={(params) => {
            const isCampoValido =
              params.field !== "id" &&
              params.field !== "dataRegistrada" &&
              params.field !== "__check__";

            if (isCampoValido) {
              setColunaSelecionada(params.field);
              setMostrarGraficoColuna(true);
            }
          }}
        />

        {relatorioFinanceiro.length === 0 && (
          <Typography sx={{ mt: 2 }} color="error">
            Nenhum relatório encontrado. {erro}
          </Typography>
        )}
      </Paper>

      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        {mostrarGraficoLinhas && linhasSelecionadas.length > 0 && (
          <Box sx={{ flex: 1 }}>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={() => setMostrarGraficoLinhas(false)}
              sx={{ mb: 2 }}>
              Fechar {linhasSelecionadas.length <= 1 ? "Gráfico" : "Gráficos"}
            </Button>
            <GraficoLinhas selectedRows={linhasSelecionadas} />
          </Box>
        )}

        {mostrarGraficoColuna && colunaSelecionada && (
          <Box sx={{ flex: 1 }}>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={() => setMostrarGraficoColuna(false)}
              sx={{ mb: 2 }}>
              Fechar Gráfico {colunaSelecionada}
            </Button>
            <GraficoColuna
              rows={relatorioFinanceiro}
              colunaSelecionadaHeaderName={String(selectedLinesHeaderName)}
              colunaSelecionada={String(colunaSelecionada)}
            />
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default GetRegistrosFinanceiros;
