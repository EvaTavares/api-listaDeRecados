import { v4 as createUuid } from "uuid";

export class Errand {
  private _id: string;
  constructor(
    private _title: string,
    private _description: string // private _status: string
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

  // public get status() {
  //   return this._status;
  // }

  public toJson() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      // status: this._status,
    };
  }
}
