import { v4 as createUuid } from "uuid";

export class Errand {
  private _id: string;
  constructor(private _title: string, private _description: string) {
    this._id = createUuid();
  }

  public get id() {
    return this._id;
  }
  public get title() {
    return this._title;
  }
  public get description() {
    return this._description;
  }

  public toJson() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
    };
  }
}
