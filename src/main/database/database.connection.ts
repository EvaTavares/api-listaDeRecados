import { DataSource } from "typeorm";
import config from "../config/database.config";

export class Database {
  private static _connection: DataSource;

  public static get connection() {
    return this._connection;
  }

  public static async connect() {
    this._connection = await config.initialize();
  }
}
