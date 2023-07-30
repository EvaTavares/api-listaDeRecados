import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserMiddleware } from "../middleware/user.middleware";
import { errandRoutes } from "./errand.routes";

export const userRoutes = () => {
  const app = Router();
  //verificar esse middleware

  app.post(
    "/",
    [UserMiddleware.validateUserEmail, UserMiddleware.validateUserPassword],
    new UserController().create
  );

  app.get("/", new UserController().list);

  app.post("/login", new UserController().login);

  // Listar por id
  app.get("/:id", new UserController().getById);

  app.use("/:userId/errands", errandRoutes());

  return app;
};
