import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { errandRoutes } from "./errand.routes";
import { UserMiddleware } from "../middleware/user.middleware";

export const userRoutes = () => {
  const app = Router();
  //verificar esse middleware

  app.post("/", new UserController().create);
  app.get("/", new UserController().list);

  app.post("/login", new UserController().login);

  // Listar por id
  app.get("/:id", new UserController().get);

  app.use("/:userId/errands", errandRoutes());

  return app;
};
