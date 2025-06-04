import GetRegistrosFinanceiros from "../../components/financeiro/GetRegistrosFinanceiros";
import GetRelatorioPedidos from "../../components/financeiro/RelatorioPedidos";

const RelatorioFinanceiro = () => {
  return (
    <div>
      <GetRegistrosFinanceiros />
      <GetRelatorioPedidos />
    </div>
  );
};

export default RelatorioFinanceiro;
