import { Skeleton } from "@mui/material";
import ImagemZizo from "../../assets/Restaurante-do-Tio-Zizo-advertisement.jpg";

const Home = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "0 30px" }}>
      <div
        style={{
          padding: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "justify",
          height: "90dvh",
        }}>
        <h1>Sistema Restaurante do Tio ZIZO</h1>
        <p style={{ padding: "30px", fontSize: "20px" }}>
          Bem vindo ao Sistema Tio Zizo. Nunca foi tão fácil gerenciar seu restaurante! Organize seu estabelecimento, facilite sua rotina e maximize seus lucros!
        </p>
      </div>
      {ImagemZizo ? (
        <img
          src={ImagemZizo}
          style={{
            width: "900px",
            height: "auto",
            maxHeight: "100dvh",
            borderRadius: "30px",
            margin: "30px",
          }}
        />
      ) : (
        <Skeleton animation="wave" />
      )}
    </div>
  );
};

export default Home;
