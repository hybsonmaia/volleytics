import { Router } from "express";
import {
  getAtletas,
  createAtleta,
  deleteAtleta,
} from "./controllers/AtletasController.js";

import {
  getOrganizadores,
  createOrganizador,
  deleteOrganizador,
  deleteAllOrganizadores,
} from "./controllers/OrganizadoresController.js";

import {
  getPeladas,
  createPelada,
  deletePelada,
  deleteAllPeladas,
} from "./controllers/PeladasController.js";

const routes = Router();
routes.get("/atletas", getAtletas);
routes.post("/atletas", createAtleta);
routes.delete("/atletas/:id", deleteAtleta);

routes.get("/organizadores", getOrganizadores);
routes.post("/organizadores", createOrganizador);
routes.delete("/organizadores/:id", deleteOrganizador);
routes.delete("/organizadores", deleteAllOrganizadores);

routes.get("/peladas", getPeladas);
routes.post("/peladas", createPelada);
routes.delete("/peladas/:id", deletePelada);
routes.delete("/peladas", deleteAllPeladas);

export default routes;
