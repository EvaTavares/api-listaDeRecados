import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.routes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//Users
app.use("/user", userRoutes());

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ` + process.env.PORT);
});
