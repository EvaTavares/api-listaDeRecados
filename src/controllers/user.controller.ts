import { users } from "../database/users";
import { Request, Response } from "express";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";

export class UserController {
  //requecimento criar usuário
  // e list

  public list(req: Request, res: Response) {
    try {
      const { name, email } = req.query;

      let result = users;

      if (name) {
        result = users.filter((user) => user.name === name);
      }
      if (email) {
        result = users.filter((user) => user.email === email);
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

      const result = users.find((user) => user.id === id);

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

      const user = users.find((user) => user.email === email);

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({
          ok: false,
          message: "User not found",
        });
      }

      if (user.password !== password) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          ok: false,
          message: "User unauthorized",
        });
      }

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Login succefully done",
        //olhar aqui
        data: user.toJson(),
        id: user.id,
        name: user.name,
      });
    } catch (error: any) {
      return res.status(StatusCodes.BAD_GATEWAY).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
