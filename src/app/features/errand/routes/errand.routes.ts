import { Router } from "express";
import { ErrandController } from "../controllers/errands.controller";
import { UserMiddleware } from "../../user/validators/user.middleware";
import { ErrandMiddleware } from "../validators/errand.middleware";

export const errandRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  app.post(
    "/",
    [ErrandMiddleware.validateFieldsCreate],
    new ErrandController().create
  );

  //verificar a rota abaixo no postman
  app.get("/", [UserMiddleware.validateUser], new ErrandController().list);

  app.put("/:idErrand", new ErrandController().update);

  app.delete("/:idErrand", new ErrandController().delete);

  return app;
};
