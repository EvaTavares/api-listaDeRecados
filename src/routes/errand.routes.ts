import { Router } from "express";
import { ErrandController } from "../controllers/errands.controller";
import { UserMiddleware } from "../middleware/user.middleware";

export const errandRoutes = () => {
  const app = Router();

  app.post(
    "/user/:userId/errands",
    [UserMiddleware.validateUser],
    new ErrandController().create
  );

  app.get(
    "/user/:userId/errand/:idErrand",
    [UserMiddleware.validateUser],
    new ErrandController().list
  );

  app.put(
    "/user/:userId/errand/:idErrand",
    [UserMiddleware.validateUser],
    new ErrandController().update
  );

  app.delete(
    "/user/:userId/errand/:idErrand",
    [UserMiddleware.validateUser],
    new ErrandController().delete
  );

  return app;
};
