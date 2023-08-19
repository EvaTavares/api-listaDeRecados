import { v4 as createUuid } from "uuid";
import { User } from "./user";
import { ErrandEntity } from "../shared/database/entities/errand.entity";

export enum StatusErrand {
  ARCHIVED = "A",
  UNARCHIVED = "UA",
}
export class Errand {
  private _id: string;

  constructor(
    private _title: string,
    private _description: string,
    private _type: StatusErrand,
    private _user: User
  ) {
    this._id = createUuid();
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get description() {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get type() {
    return this._type;
  }

  public set type(type: StatusErrand) {
    this._type = type;
  }

  public get user(): User {
    return this._user;
  }

  public toJson() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      type: this._type,
      user: this._user?.toJson(),
    };
  }

  public static create(row: ErrandEntity, user: User) {
    const errand = new Errand(
      row.title,
      row.description,
      row.type as StatusErrand,
      user
    );
    errand._id = row.id;

    return errand;
  }
}
