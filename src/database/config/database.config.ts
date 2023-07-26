import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { UserEntity } from "../entities/user.entity";
import { ErrandEntity } from "../entities/errand.entity";

dotenv.config();

const config = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  // url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  schema: "listaderecados",
  entities: ["src/database/entities/**/*.ts"],
});

export default config;
