import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { ApiResponse } from "../utils/Api.response.adapter";
import { User } from "../models/user";

export class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const repository = new UserRepository();

      const validEmail = await repository.getByEmail(email);

      if (validEmail) {
        return ApiResponse.invalid(res, "E-mail");
      }

      const user = new User(name, email, password);
      const result = await repository.create(user);

      return ApiResponse.success(
        res,
        "User successufully created",
        result.toJson()
      );
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  //ok
  public async list(req: Request, res: Response) {
    try {
      const repository = new UserRepository();
      const result = await repository.list();

      return ApiResponse.success(
        res,
        "Users were sucessfully listed",
        result.map((user) => user.toJson())
      );
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  // ok
  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = new UserRepository();
      const result = await repository.getById(id);

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

  // ok
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const repository = new UserRepository();
      const login = await repository.getByEmail(email);

      if (!email) {
        return ApiResponse.fieldNotProvided(res, "E-mail");
      }
      if (!password) {
        return ApiResponse.fieldNotProvided(res, "Password");
      }

      const user = await new UserRepository().getByEmail(email);

      if (!user) {
        return ApiResponse.invalidCredentials(res);
      }

      if (user.password !== password) {
        return ApiResponse.invalidCredentials(res);
      }

      return ApiResponse.success(res, "Successful login", {
        id: login?.id,
        email: login?.email,
      });
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }
}
