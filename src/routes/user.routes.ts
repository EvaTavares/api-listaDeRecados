import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { errandRoutes } from "./errand.routes";

export const userRoutes = () => {
  const app = Router();

  app.get("/", new UserController().list);
  // Listar por id
  app.get("/:id", new UserController().get);
  app.post("/", new UserController().create);
  app.post("/login", new UserController().login);

  app.use("/:userId/errand", errandRoutes());

  return app;
};
