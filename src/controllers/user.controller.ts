import { usersDb } from "../database/users";
import { Request, Response } from "express";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user";

export class UserController {
  public create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name) {
        return res.status(StatusCodes.NOT_FOUND).send({
          ok: false,
          message: "Invalid name",
        });
      }
      if (!email) {
        return res.status(StatusCodes.NOT_FOUND).send({
          ok: false,
          message: "Invalid email",
        });
      }
      if (!password) {
        return res.status(StatusCodes.NOT_FOUND).send({
          ok: false,
          message: "Invalid password",
        });
      }

      const user = new User(name, email, password);
      usersDb.push(user);

      return res.status(StatusCodes.CREATED).send({
        ok: true,
        message: "User succefully done",
        //olhar aqui
        data: user.toJson(),
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
      const { name, email } = req.query;

      let result = usersDb;

      if (name) {
        result = usersDb.filter((user) => user.name === name);
      }
      if (email) {
        result = usersDb.filter((user) => user.email === email);
      }

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Users were sucessfully listed",
        data: result,
        // data: result.map((user) => {
        //   return {
        //     id: user.toJson().id,
        //     name: user.toJson().name,
        //     email: user.toJson().email,
        //   };
        // }),
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = usersDb.find((user) => user.id === id);

      if (!result) {
        return res.status(StatusCodes.NOT_FOUND).send({
          ok: false,
          message: "User was not found",
        });
      }

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Users was sucessfully obtained",
        data: result.toJson(),
      });
    } catch (error: any) {
      return res.status(StatusCodes.BAD_GATEWAY).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(StatusCodes.NOT_FOUND).send({
          ok: false,
          message: "Invalid email",
        });
      }
      if (!password) {
        return res.status(StatusCodes.NOT_FOUND).send({
          ok: false,
          message: "Invalid password",
        });
      }

      const user = usersDb.find((user) => user.email === email);

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          ok: false,
          message: "Unauthorized access ",
        });
      }

      if (user.password !== password) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          ok: false,
          message: "Unauthorized access",
        });
      }

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Login succefully done",
        data: { email: user.email, password: user.password },
      });
    } catch (error: any) {
      return res.status(StatusCodes.BAD_GATEWAY).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
