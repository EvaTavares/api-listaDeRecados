import { UserEntity } from "../../../../database/entities/user.entity";
import { Database } from "../../../../main/database/database.connection";

import { User } from "../../../models/user";
// import { UserEntity } from "../../../shared/database/entities/user.entity";

export class UserRepository {
  // padrão data mapper
  private repository = Database.connection.getRepository(UserEntity);

  // com ORM -> usecase
  public async create(newUser: User) {
    const UserEntity = this.repository.create({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });

    // o save leva para o banco de dados
    const result = await this.repository.save(UserEntity);
    console.log(result);

    return UserRepository.mapRowToModel(result);
  }

  //com ORM
  public async list() {
    const result = await this.repository.find();
    return result.map((entity) => UserRepository.mapRowToModel(entity));
    // list retorna um User[] - informações de models
  }

  // com ORM
  public async getById(id: string) {
    const result = await this.repository.findOneBy({ id });

    if (!result) {
      return undefined;
    }

    return UserRepository.mapRowToModel(result);
  }

  //com ORM -> usecase
  public async getByEmail(email: string): Promise<User | undefined> {
    const result = await this.repository.findOneBy({ email });

    // preciso do mapeamento do user model
    return UserRepository.mapRowToModel(result);
  }

  //com ORM
  public async getByPassword(password: string) {
    const result = await this.repository.findOne({ where: { password } });

    if (!result) {
      return undefined;
    }

    return UserRepository.mapRowToModel(result);
  }

  public static mapRowToModel(user?: UserEntity | null) {
    if (!user) {
      return undefined;
    }

    return User.create(user);
  }
}
