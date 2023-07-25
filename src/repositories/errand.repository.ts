import { errands } from "../data/errands";
import { Database } from "../database/config/database.connection";
import { ErrandEntity } from "../database/entities/errand.entity";
import { Errand, StatusErrand } from "../models/errand";
import { User } from "../models/user";
import { UserRepository } from "./user.repository";
interface ListErrandsParams {
  userId: string;
  type?: StatusErrand;
}

export class ErrandRepository {
  // conexão com o BD
  private connection = Database.connection;
  private repository = Database.connection.getRepository(ErrandEntity);

  public async create(errand: Errand) {
    // errands.push(errand);
    let query = `insert into listaderecados.errand`;
    query += `(id, title, description, type, id_user)`;
    query += `values`;
    query += `('${errand.id}', '${errand.title}', '${errand.description}', '${errand.type}', '${errand.user.id}')`;

    await this.connection.query(query);
  }

  public async get(idErrand: string) {
    return errands.find((errand) => errand.id === idErrand);
  }

  //list
  public async list(params: ListErrandsParams) {
    const result = await this.repository.findBy({
      idUser: params.userId,
      type: params.type,
    });

    // duas tabelas sendo envolvidas
    return result.map((row) => this.mapRowToModel(row));
  }

  public getIndex(idErrand: string) {
    return errands.findIndex((errand) => errand.id === idErrand);
  }

  public async delete(id: string) {
    const result = await this.connection.query(
      `delete from listaderecados.errand where id = '${id}'`
    );
    return result.rowCount;
  }

  private mapRowToModel(row: any) {
    // const user = UserRepository.mapRowToModel(row);

    // todo: depois voltar a afazer o maprowtomodel do user
    const user = new User("maria", "teste@teste01", "1234");
    return Errand.create(row, user);
  }
}
