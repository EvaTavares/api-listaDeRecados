import { users } from "../database/users";
import { Errand } from "../models/errand";
import { Request, Response } from "express";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";

export class ErrandController {
  public createErrands(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description } = req.body;

      const user = users.find((user) => user.id === userId);
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "User was not found" });
      }

      if (!title) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          ok: false,
          message: "Title was not provided",
        });
      }
      if (!description) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          ok: false,
          message: "Description was not provided",
        });
      }

      const newErrand = new Errand(title, description);
      user.errands?.push(newErrand);

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Errand was sucessfully listed",
        data: newErrand.toJson(),
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: "esta entrando aqui",
      });
    }
  }
}
