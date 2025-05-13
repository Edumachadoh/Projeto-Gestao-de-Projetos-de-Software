import { useState } from "react";

const ListRelatorioFinanceiro = () => {
  const [relatorioFinanceiro, setRelatorioFinanceiro] = useState([]);
  const [erro, setErro] = useState("");

  const buscarRelatorioFinanceiro = async (e: any) => {
    e.preventDefault();
    setErro("");
    try {
      const response = await fetch(
        "http://localhost:5190/api/registros-financeiros",
      );
      console.log(response);
    } catch (error) {
      setErro("Erro ao buscar relatório financeiro");
      console.log("Erro ao buscar relatório financeiro:", error);
    }
  };

  return (
    <div>
      <button onClick={buscarRelatorioFinanceiro}>Teste</button>
    </div>
  );
};

export default ListRelatorioFinanceiro;
