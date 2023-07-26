import { Errand, StatusErrand } from "../models/errand";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/Http.response.adapter";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";

export class ErrandController {
  public async create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description, type } = req.body;

      const user = await new UserRepository().getByid(userId);

      if (!user) {
        return ApiResponse.notFound(res, "User");
      }
      if (!title) {
        return ApiResponse.fieldNotProvided(res, "Title");
      }
      if (!description) {
        return ApiResponse.fieldNotProvided(res, "Description");
      }
      if (!type) {
        return ApiResponse.fieldNotProvided(res, "Type");
      }

      const newErrand = new Errand(title, description, type, user);
      await new ErrandRepository().create(newErrand);

      return ApiResponse.success(
        res,
        "Errand was sucessfully created",
        newErrand
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

  public getErrandById(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;

      const user = new UserRepository().getByid(userId);

      if (!user) {
        return ApiResponse.notFound(res, "User");
      }

      const errandValid = user.errands.find((errand) => errand.id === idErrand);

      if (!errandValid) {
        return ApiResponse.notFound(res, "Errand");
      }

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Errand was sucessfully listed",
        data: errandValid.toJson(),
      });
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;
      const { title, description, type } = req.body;

      const user = new UserRepository().getByid(userId);

      if (!user) {
        return ApiResponse.notFound(res, "User");
      }

      const errandRepository = new ErrandRepository();
      // tem que ser do tipo errand | undefined
      const errand = await errandRepository.get(idErrand);

      if (!errand) {
        return ApiResponse.notFound(res, "Errand");
      }

      if (!title || !description || !type) {
        return ApiResponse.invalid(res, "Errand");
      }

      errand.title = title;
      errand.description = description;
      errand.type = type as StatusErrand;

      // salvar...
      await errandRepository.update(errand);

      const errands = await errandRepository.list({
        userId,
      });

      return ApiResponse.success(
        res,
        "Errand was successfully updated",
        errands.map((errand) => errand.toJson())
      );
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;

      const user = await new UserRepository().getByid(userId);

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
