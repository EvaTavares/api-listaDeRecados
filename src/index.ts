import express from "express";
import { UserMiddleware } from "./middleware/user.middleware";
import { ErrandController } from "./controllers/errands.controller";
import { UserController } from "./controllers/user.controller";

const app = express();
app.use(express.json());

//List Users
app.get("/users", new UserController().getAllUsers);

// Listar por id
app.get("/users/:id", new UserController().listUserId);

//Create Errand
app.post(
  "/user/:userId/errands",
  [UserMiddleware.validateUser],
  new ErrandController().createErrands
);

app.listen(3333, () => {
  console.log("API is running");
});
