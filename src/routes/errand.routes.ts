import { Router } from "express";
import { ErrandController } from "../controllers/errands.controller";
import { UserMiddleware } from "../middleware/user.middleware";

export const errandRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  app.post("/", [UserMiddleware.validateUser], new ErrandController().create);

  app.get(
    "/:idErrand",
    [UserMiddleware.validateUser],
    new ErrandController().list
  );

  app.put(
    "/:idErrand",
    [UserMiddleware.validateUser],
    new ErrandController().update
  );

  app.delete(
    "/:idErrand",
    [UserMiddleware.validateUser],
    new ErrandController().delete
  );

  return app;
};
