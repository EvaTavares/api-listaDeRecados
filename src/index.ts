import { Database } from "./main/database/database.connection";
import { Server } from "./main/server/express.server";
import "reflect-metadata";

// inicializar o banco de dados, antes do listen
Promise.all([Database.connect()]).then(() => {
  console.log("Database is connected");
  Server.listen();
});
