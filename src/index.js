import express from "express";
import cors from "cors";

import connectDatabase from "./database/db.js";
import routes from "./routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

connectDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando e banco de dados conectados");
    });
  })
  .catch((error) => console.log(error));
