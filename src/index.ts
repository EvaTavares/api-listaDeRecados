import { Server } from "./main/config/express.config";
import { Database } from "./main/database/database.connection";
import "reflect-metadata";

// inicializar o banco de dados, antes do listen
Database.connect().then(() => {
  console.log("Database is connected!");
  const app = Server.create();
  Server.listen(app);
});
