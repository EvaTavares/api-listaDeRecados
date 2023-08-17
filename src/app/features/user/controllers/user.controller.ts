import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { ApiResponse } from "../../../shared/util/Api.response.adapter";
import { User } from "../../../models/user";
import { ListUsersUsecase } from "../usecases/list-users.usecase";
import { LoginUsecase } from "../usecases/login.usercase";
import { Return } from "../../../shared/util/return.adapter";

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
      // 1 - obter parâmentros
      // 2- executar o usecase correspondente
      // 3- retornar uma resposta
      // ---------------------

      // const usecase = new ListUsersUsecase();
      // const result = await usecase.execute();
      const result = await new ListUsersUsecase().execute();

      // return ApiResponse.success(res,"Users were sucessfully listed",result.map((user) => user.toJson()));
      return res.status(result.code).send(result);
    } catch (error: any) {
      return Return.genericError(error);
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
      // 1- obter os parametos
      const { email, password } = req.body;

      if (!email) {
        return Return.fieldNotProvided("E-mail");
      }
      if (!password) {
        return Return.fieldNotProvided("Password");
      }

      //  2 - chamar o usecase
      const result = await new LoginUsecase().execute(req.body);

      // retornar uma resposta
      return res.status(result.code).send(result);
    } catch (error: any) {
      return Return.genericError(error);
      // return ApiResponse.genericError(res, error);
    }
  }
}
