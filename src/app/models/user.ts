import { v4 as createUuid } from "uuid";
import { UserEntity } from "../shared/database/entities/user.entity";

export class User {
  private _id: string;
  constructor(
    private _name: string,
    private _email: string,
    private _password: string
  ) {
    this._id = createUuid();
  }
  // cade o push p dentro desse array?

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get email() {
    return this._email;
  }
  public set email(email: string) {
    this._email = email;
  }

  public get password(): string {
    return this._password;
  }

  public toJson() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      password: this._password,
    };
  }

  public static create(row: UserEntity) {
    const user = new User(row.name, row.email, row.password);
    user._id = row.id;
    return user;
  }
}
