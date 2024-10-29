import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import connectDatabase from "./database/db.js";
import routes from "./routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../page")));
app.use('/img', express.static(path.join(__dirname, "../img")));

app.get("/", (req, res) => {
  res.redirect("/login/login.html");
});

app.use(routes);

connectDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando e banco de dados conectado em http://localhost:3000");
    });
  })
  .catch((error) => console.log(error));
