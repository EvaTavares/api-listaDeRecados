import { PoolClient } from "pg";
import pool from "./database.config";

export class Database {
  private static _connection: PoolClient;

  public static get connection() {
    return this._connection;
  }

  public static async connect() {
    this._connection = await pool.connect();
  }
}
