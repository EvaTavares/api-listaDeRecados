import cors from "cors";
import express, { Express } from "express";
import { userRoutes } from "../../app/features/user/routes/user.routes";
import * as dotenv from "dotenv";

dotenv.config();

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  //Users
  app.use("/users", userRoutes());

  return app;
};
