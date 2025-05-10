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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis cum
          inventore reiciendis pariatur, mollitia maiores quos non sapiente
          totam voluptatum quae nemo quaerat ullam error similique enim.
          Repellat, natus soluta!
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
          }}
        />
      ) : (
        <Skeleton animation="wave" />
      )}
    </div>
  );
};

export default Home;
