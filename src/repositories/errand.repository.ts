import { errands } from "../database/errands";
import { Errand } from "../models/errand";

export class ErrandRepository {
  public create(errand: Errand) {
    errands.push(errand);
  }

  public get(idErrand: string) {
    return errands.find((errand) => errand.id === idErrand);
  }
  //falta o list

  public getIndex(idErrand: string) {
    return errands.findIndex((errand) => errand.id === idErrand);
  }

  public delete(index: number) {
    return errands.splice(index, 1);
  }
}
