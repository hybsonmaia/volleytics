import { Router } from "express";

import {
  getAtletas,
  createAtleta,
  deleteAtleta,
} from "./controllers/AtletasController.js";

const routes = Router();

routes.get("/atletas", getAtletas);
routes.post("/atletas", createAtleta);
routes.delete("/atletas/:id", deleteAtleta);

export default routes;
