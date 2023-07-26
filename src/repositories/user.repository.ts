import { usersDb } from "../data/users";
import { Database } from "../database/config/database.connection";
import { UserEntity } from "../database/entities/user.entity";
import { User } from "../models/user";

export class UserRepository {
  // padrão data mappear
  private repository = Database.connection.getRepository(UserEntity);

  public async list() {
    //antes era assim => const result = await this.connection.query("select * from listaderecados.user");
    const result = await this.repository.find();
    return result.map((entity) => UserRepository.mapRowToModel(entity));
    // list retorna um User[] - informações de models
  }
  // com ORM
  public async getByid(id: string) {
    //antes era assim =>  const result = await this.connection.query(`select * from listaderecados.user where id = '${id}'`);
    const result = await this.repository.findOneBy({ id });

    if (!result) {
      return undefined;
    }
    // preciso do mapeamento do user model
    return UserRepository.mapRowToModel(result);
  }

  public async create(newUser: any) {
    const user = new User(newUser.name, newUser.email, newUser.password);
    const result = await this.connection.query(
      `insert into listaderecados.user (name, email,password)
      values
      ('${user.name}','${user.email}','${user.password}')
      `
    );
    console.log(result.rows);
    return result.rows;
  }

  public async getByEmail(email: string) {
    // return usersDb.find((user) => user.email === email);
    //antes era assim =>  const result = await this.connection.query(`select * from listaderecados.user where id = '${id}'`);
    const result = await this.repository.findOneBy({ email });

    if (!result) {
      return undefined;
    }
    // preciso do mapeamento do user model
    return UserRepository.mapRowToModel(result);
  }

  public static mapRowToModel(row: UserEntity): User {
    return User.create(row);
  }
}
