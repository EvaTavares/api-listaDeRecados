import { Errand, StatusErrand } from "../../../models/errand";
import { Request, Response } from "express";
import { ApiResponse } from "../../../shared/util/Api.response.adapter";
// Constants enumerating the HTTP status codes.
import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";
import { UpdateErrandUsecase } from "../usecases/update-errand.usecase";

export class ErrandController {
  public async create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description, type } = req.body;

      const user = await new UserRepository().getById(userId);

      if (!user) {
        return ApiResponse.notFound(res, "User");
      }

      const newErrand = new Errand(title, description, type, user);
      await new ErrandRepository().create(newErrand);

      return ApiResponse.success(
        res,
        "Errand was sucessfully created",
        newErrand.toJson()
      );
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { type } = req.query;

      let errands = await new ErrandRepository().list({
        userId: userId,
        type: type as StatusErrand,
      });

      return ApiResponse.success(res, "Errands successfully listed", {
        errands: errands.map((errand) => errand.toJson()),
      });
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  // com usecase
  public async update(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;
      const { title, description } = req.body;

      const result = await new UpdateErrandUsecase().execute({
        title,
        description,
        userId,
        idErrand,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;

      const user = await new UserRepository().getById(userId);

      if (!user) {
        return ApiResponse.notFound(res, "User");
      }

      const errandRepository = new ErrandRepository();
      const delitedErrands = await errandRepository.delete(idErrand);

      if (delitedErrands === 0) {
        return ApiResponse.notFound(res, "Errand");
      }

      const errands = await errandRepository.list({
        userId,
      });

      return ApiResponse.success(
        res,
        "Errand successfully deleted",
        errands.map((errand) => errand.toJson())
      );
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }
}
