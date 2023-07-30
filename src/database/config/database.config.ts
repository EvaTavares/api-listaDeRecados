import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

let entities = ["src/database/entities/**/*.ts"];
let migrations = ["src/database/migrations/**/*.ts"];

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
  synchronize: false, //espelha as entidades que vc ja tem no BD
  schema: "listaderecados",
  // logging: true, //mostra o sql no terminal
  entities,
  migrations,
});

export default config;
