import { useEffect, useState } from "react";
import type { Relatorio } from "../../models/Relatorio";
import { Button, Paper } from "@mui/material";
import { DataGrid, GridCloseIcon, type GridColDef } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import GraficoLinhas from "./graficos/GraficoLinhas";
import GraficoColuna from "./graficos/GraficoColuna";

const ListRelatorioFinanceiro = () => {
  const [relatorioFinanceiro, setRelatorioFinanceiro] = useState<Relatorio[]>(
    [],
  );
  const [erro, setErro] = useState("");
  const [showLineGraphic, setShowLineGraphic] = useState(false);
  const [showColumnGraphic, setShowColoumnGraphic] = useState(false);
  const [colunaSelecionada, setColunaSelecionada] = useState<string | null>(
    null,
  );
  const [selectedRows, setSelectedRows] = useState<Relatorio[]>([]);

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

  //esse type é obrigatório para o DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", type: "number" },
    {
      field: "dataRegistrada",
      headerName: "Data",
      type: "string",
    },
    { field: "estoque", headerName: "Estoque", type: "number" },
    {
      field: "funcionarios",
      headerName: "Funcionários",
      type: "number",
    },
    { field: "gas", headerName: "Gás", type: "number" },
    { field: "itens", headerName: "Itens", type: "number" },
    { field: "luz", headerName: "Luz", type: "number" },
  ];

  //formatando as linhas para as informações corretas
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

  // Busca o headerName para exibir no título do gráfico
  const selectedLinesHeaderName = columns.find(
    (col) => col.field === colunaSelecionada,
  )?.headerName;

  return (
    <div style={{ width: "fit-content", padding: 20, display: "flex" }}>
      <Paper sx={{ height: "90dvh" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          //quando seleciona uma ou mais linhas
          onRowSelectionModelChange={(selectionModel) => {
            const idsArray = Array.from(selectionModel.ids ?? []);
            const numericIds = idsArray.map((id) => Number(id));
            const selectedData = relatorioFinanceiro.filter((relatorio) =>
              numericIds.includes(relatorio.id),
            );
            setSelectedRows(selectedData);

            //se caso nenhuma for selecionada ele desaparece com o gráfico
            if (selectedData.length > 0) {
              setShowLineGraphic(true);
            } else {
              setShowLineGraphic(false);
            }
          }}
          //quando seleciona o cabeçalho de uma coluna
          onColumnHeaderClick={(params) => {
            if (params.field !== "id" && params.field !== "dataRegistrada") {
              setColunaSelecionada(params.field);
              setShowColoumnGraphic(true);
            }
          }}
        />
      </Paper>

      {relatorioFinanceiro.length === 0 && (
        <p>Nenhum relatório encontrado. {erro}</p>
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {showLineGraphic && selectedRows.length > 0 && (
          <div>
            <Button
              variant="contained"
              onClick={() => setShowLineGraphic(false)}>
              <GridCloseIcon />
            </Button>
            <GraficoLinhas selectedRows={selectedRows} />
          </div>
        )}
        {showColumnGraphic && (
          <div>
            <Button
              variant="contained"
              onClick={() => setShowColoumnGraphic(false)}>
              <CloseIcon />
            </Button>
            <GraficoColuna
              rows={relatorioFinanceiro}
              colunaSelecionadaHeaderName={String(selectedLinesHeaderName)}
              colunaSelecionada={String(colunaSelecionada)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListRelatorioFinanceiro;
