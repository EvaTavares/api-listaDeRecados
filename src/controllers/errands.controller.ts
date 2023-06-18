import { usersDb } from "../database/users";
import { Errand } from "../models/errand";
import { Request, Response } from "express";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";

export class ErrandController {
  public create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description, type } = req.body;

      const user = usersDb.find((user) => user.id === userId);
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
      if (!type) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          ok: false,
          message: "Type was not provided",
        });
      }

      const newErrand = new Errand(title, description, type);
      user.errands?.push(newErrand);

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Errand was sucessfully listed",
        data: newErrand.toJson(),
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public list(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;

      const user = usersDb.find((user) => user.id === userId);

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "User was not found" });
      }

      const errandValid = user.errands.find((errand) => errand.id === idErrand);

      if (!errandValid) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "User was not found." });
      }

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Errand was sucessfully listed",
        data: errandValid.toJson(),
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;
      const { title, description, type } = req.body;

      const user = usersDb.find((user) => user.id === userId);

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "User was not found" });
      }

      const ErrandIndex = user.errands.find((errand) => errand.id === idErrand);

      if (!ErrandIndex) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "Errand was not found." });
      }

      if (!title || !description || !type) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "Errand is invalid" });
      }

      ErrandIndex.title = title;
      ErrandIndex.description = description;
      ErrandIndex.type = type;

      return res
        .status(StatusCodes.CREATED)
        .send({ ok: true, message: "Errand was successfully updated" });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;

      const user = usersDb.find((user) => user.id === userId);

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "User was not found." });
      }

      const errandIndex = user.errands.findIndex(
        (errand) => errand.id === idErrand
      );

      if (errandIndex === -1) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "Errand was not found." });
      }

      const deletedErrand = user.errands.splice(errandIndex, 1);

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Successfully deleted errand",
        data: deletedErrand[0].toJson(),
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
