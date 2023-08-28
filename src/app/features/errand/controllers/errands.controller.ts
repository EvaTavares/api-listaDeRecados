import { Errand, StatusErrand } from "../../../models/errand";
import { Request, Response } from "express";
import { ApiResponse } from "../../../shared/util/Api.response.adapter";
import { UpdateErrandUsecase } from "../usecases/update-errand.usecase";
import { ListErrandUsecase } from "../usecases/list-errand.usecase";
import { CreateErrandUsecase } from "../usecases/create-errand.usecase";
import { DeleteErrandUsecase } from "../usecases/delete-errand.usecase";

export class ErrandController {
  // com usecase
  public async create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description, type } = req.body;

      const result = await new CreateErrandUsecase().execute(req.body)

      return res.status(result.code).send(result)
    
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  //  com usecase
  public async list(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description, type } = req.query;

      const result = await new ListErrandUsecase().execute({
        userId: userId,
        title: title as string,
        description: description as string,
        type: type as StatusErrand,
      })      

      return res.status(result.code).send(result);
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
        userId,
        idErrand,
        title,
        description,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  // com usecase
  public async delete(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;

      const result = await new DeleteErrandUsecase().execute({userId, idErrand})

      return res.status(result.code).send(result)
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }
}
