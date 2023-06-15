import express from "express";
import { errandRoutes } from "./routes/errand.routes";
import { userRoutes } from "./routes/user.routes";

const app = express();
app.use(express.json());

//Users
app.use("/user", userRoutes());
// Errand
app.use(errandRoutes());

app.listen(3333, () => {
  console.log("API is running");
});
