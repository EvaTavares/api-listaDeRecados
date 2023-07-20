import { usersDb } from "../database/users";

export class UserRepository {
  public get(userId: string) {
    return usersDb.find((user) => user.id === userId);
  }

  public getByEmail(email: string) {
    return usersDb.find((user) => user.email === email);
  }
}
