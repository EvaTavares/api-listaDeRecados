import { Database } from "../../../../main/database/database.connection";

import { Errand, StatusErrand } from "../../../models/errand";

import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandEntity } from "../../../shared/database/entities/errand.entity";

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
    const result = await this.repository.findOne({
      where: { id: errand.id },
      relations: { user: true },
    });
    return this.mapRowToModel(result!);
  }

  //  list com ORM
  public async list(params: ListErrandsParams) {
    const result = await this.repository.find({
      where: {
        idUser: params.userId,
      },
      relations: {
        user: true,
      },
    });
    // duas tabelas sendo envolvidas
    return result.map((row) => this.mapRowToModel(row));
  }

  // update com ORM
  public async update(errand: Errand) {
    await this.repository.update(
      {
        id: errand.id,
      },
      {
        title: errand.title,
        description: errand.description,
      }
    );
  }

  // delete com ORM
  public async delete(id: string) {
    const result = await this.repository.delete(id);
    return result.affected ?? 0;
  }

  //precisa desse?

  public async getByIdErrand(id: string) {
    const result = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });

    if (!result) {
      return undefined;
    }

    return this.mapRowToModel(result);
  }

  private mapRowToModel(entity: ErrandEntity) {
    const user = UserRepository.mapRowToModel(entity.user);
    return Errand.create(entity, user);
  }
}
