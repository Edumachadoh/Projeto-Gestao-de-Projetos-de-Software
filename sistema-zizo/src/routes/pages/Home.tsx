import { Skeleton } from "@mui/material";
import ImagemZizo from "../../assets/Restaurante-do-Tio-Zizo-advertisement.jpg";

const Home = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>
      <div
        style={{
          padding: "30px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "justify",
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
            width: "1000px",
            height: "auto",
            padding: "30px",
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
