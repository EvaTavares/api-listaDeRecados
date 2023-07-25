import { usersDb } from "../data/users";
import { Request, Response } from "express";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";
import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repository";
import { ApiResponse } from "../utils/Http.response.adapter";

export class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { name, email, password, errands } = req.body;

      const repository = new UserRepository();
      const result = await repository.create({
        name,
        email,
        password,
        errands,
      });

      return ApiResponse.success(res, "ok", result);
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const repository = new UserRepository();
      const result = await repository.list();

      // const { name, email } = req.query;
      // let result = usersDb;
      // if (name) {
      //   result = usersDb.filter((user) => user.name === name);
      // }
      // if (email) {
      //   result = usersDb.filter((user) => user.email === email);
      // }

      return ApiResponse.success(res, "Users were sucessfully listed", result);
      // res.status(StatusCodes.OK).send({
      //   ok: true,
      //   message: "Users were sucessfully listed",
      //   data: result,
      // });
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
      // res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      //   ok: false,
      //   message: error.toString(),
      // });
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = new UserRepository();
      const result = await repository.getByid(id);

      if (!result) {
        return ApiResponse.notFound(res, "User ");
      }

      return ApiResponse.success(
        res,
        "User successfully obtained",
        result.toJson()
      );
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
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
        data: { name: user.name, id: user.id },
      });
    } catch (error: any) {
      return res.status(StatusCodes.BAD_GATEWAY).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
