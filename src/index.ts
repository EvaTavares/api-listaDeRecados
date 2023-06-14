import express from "express";
import { UserController } from "./controllers/user.controller";
import { errandRoutes } from "./routes/errand.routes";

const app = express();
app.use(express.json());

//List Users
app.get("/users", new UserController().getAllUsers);

// Listar por id
app.get("/users/:id", new UserController().listUserId);

app.post("/users/login", new UserController().login);

// Errand
app.use(errandRoutes());

app.listen(3333, () => {
  console.log("API is running");
});
