import { Database } from "../database/config/database.connection";
import { ErrandEntity } from "../database/entities/errand.entity";
import { Errand, StatusErrand } from "../models/errand";
import { User } from "../models/user";

interface ListErrandsParams {
  userId: string;
  type?: StatusErrand;
}

export class ErrandRepository {
  // conexão com o BD
  private repository = Database.connection.getRepository(ErrandEntity);

  // create com ORM
  public async create(errand: Errand) {
    // transformou em entity
    const errandEntity = this.repository.create({
      id: errand.id,
      title: errand.title,
      description: errand.description,
      type: errand.type,
      idUser: errand.user.id,
    });

    await this.repository.save(errandEntity);
  }

  //  list com ORM
  public async list(params: ListErrandsParams) {
    const result = await this.repository.findBy({
      idUser: params.userId,
      type: params.type,
    });

    // duas tabelas sendo envolvidas
    return result.map((row) => this.mapRowToModel(row));
  }

  // update com ORM
  public async get(errand: Errand) {
    await this.repository.update(
      {
        id: errand.id,
      },
      {
        title: errand.title,
        description: errand.description,
        type: errand.type,
      }
    );
  }

  // delete com ORM
  public async delete(id: string) {
    const result = await this.repository.delete(id);
    return result.affected ?? 0;
  }

  private mapRowToModel(row: any): Errand {
    // const user = UserRepository.mapRowToModel(row);

    // todo: depois voltar a afazer o maprowtomodel do user
    const user = new User("maria", "teste@teste01", "1234");
    return Errand.create(row, user);
  }
}
