import { usersDb } from "../database/users";

export class UserRepository {
  public get(id: string) {
    return usersDb.find((user) => user.id === id);
  }

  public getByEmail(email: string) {
    return usersDb.find((user) => user.email === email);
  }
}
