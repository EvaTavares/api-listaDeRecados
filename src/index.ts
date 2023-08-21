import { Database } from "./main/database/database.connection";
import { CacheDatabase } from "./main/database/redis.connection";
import { Server } from "./main/config/express.config";
import "reflect-metadata";

// inicializar o banco de dados, antes do listen
Promise.all([Database.connect(), CacheDatabase.connect()]).then(() => {
  const app = Server.create();
  Server.listen(app);
});
