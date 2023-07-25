import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.routes";
import * as dotenv from "dotenv";
import { Database } from "./database/config/database.connection";
import "reflect-metadata";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//Users
app.use("/users", userRoutes());

// inicializar o banco de dados, antes do listen
Database.connect().then(() => {
  console.log("Database is connected!");
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ` + process.env.PORT);
  });
});
