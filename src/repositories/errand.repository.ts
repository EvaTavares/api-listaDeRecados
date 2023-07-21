import { errands } from "../data/errands";
import { Database } from "../database/database.connection";
import { Errand, StatusErrand } from "../models/errand";
interface ListTransactionsParams {
  userId: string;
  type?: StatusErrand;
}

export class ErrandRepository {
  // conexão com o BD
  private connection = Database.connection;

  public async create(errand: Errand) {
    // errands.push(errand);
    let query = `insert into listaderecados.errand`;
    query += `(id, title, description, type, id_user)`;
    query += `values`;
    query += `('${errand.id}', '${errand.title}', '${errand.description}', '${errand.type}', '${errand.user.id}')`;

    await this.connection.query(query);
  }

  public get(idErrand: string) {
    return errands.find((errand) => errand.id === idErrand);
  }

  //list

  public getIndex(idErrand: string) {
    return errands.findIndex((errand) => errand.id === idErrand);
  }

  public delete(index: number) {
    return errands.splice(index, 1);
  }
}
