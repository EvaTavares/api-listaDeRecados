import { usersDb } from "../data/users";
import { Database } from "../database/database.connection";
import { User } from "../models/user";

export class UserRepository {
  private connection = Database.connection;

  public async list() {
    const result = await this.connection.query(
      "select * from listaderecados.user"
    );
    return result.rows;
  }

  public async get(id: string) {
    const result = await this.connection.query(
      `select * from listaderecados.user where id = '${id}'`
    );

    if (result.rows.length == 0) {
      return undefined;
    }

    const dbUser = result.rows[0];
    const user = new User(dbUser.name, dbUser.email, dbUser.password);

    return this.mapRowToModel(result.rows[0]);
  }

  public getByEmail(email: string) {
    return usersDb.find((user) => user.email === email);
  }

  private mapRowToModel(row: any): User {
    return User.create(row);
  }
}
