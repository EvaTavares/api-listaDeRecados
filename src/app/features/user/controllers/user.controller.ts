import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { ApiResponse, UsecaseResponse } from "../../../shared/util/index";
import { ListUsersUsecase } from "../usecases/list-users.usecase";
import { LoginUsecase } from "../usecases/login.usercase";
import { CreateUsersUsecase } from "../usecases/create-users.usecase";
import { LisByIdUsecase } from "../usecases/listById-user.usecase";

export class UserController {
  // ok com usecase
  public async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      //   validações...vai para os validators
      if (!email) {
        return ApiResponse.fieldNotProvided(res, "Email");
      }

      const result = await new CreateUsersUsecase().execute(req.body);

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  //ok com usecase
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
      return ApiResponse.genericError(res, error);
    }
  }

  // ok com usecase
  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await new LisByIdUsecase().execute({
        id,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  // ok -. usecase
  public async login(req: Request, res: Response) {
    try {
      // 1- obter os parametos
      const { email, password } = req.body;

      if (!email) {
        return ApiResponse.fieldNotProvided(res, "E-mail");
      }
      if (!password) {
        return ApiResponse.fieldNotProvided(res, "Password");
      }

      //  2 - chamar o usecase
      const result = await new LoginUsecase().execute({
        email,
        password,
      });

      // retornar uma resposta
      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }
}
