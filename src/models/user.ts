import { v4 as createUuid } from "uuid";
import { Errand } from "../models/errand";

export class User {
  private _id: string;
  private _errands: Errand[];
  constructor(
    private _name: string,
    private _email: string,
    private _password: string
  ) {
    this._id = createUuid();
    this._errands = [];
  }

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

  public get errands(): Errand[] {
    return this._errands;
  }

  public toJson() {
    return {
      id: this._id,
      email: this._email,
      password: this._password,
      errands: this._errands,
    };
  }
}
