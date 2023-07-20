import { usersDb } from "../database/users";
import { Errand } from "../models/errand";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/Http.response.adapter";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";

export class ErrandController {
  public create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description, type } = req.body;

      const user = new UserRepository().get(userId);
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

      const newErrand = new Errand(title, description, type);
      new ErrandRepository().create(newErrand);

      return ApiResponse.success(
        res,
        "Errand was sucessfully listed",
        newErrand
      );
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  public listAllErrands(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = new UserRepository().get(userId);

      if (!user) {
        return ApiResponse.notFound(res, "User");
      }

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Errand was sucessfully listed",
        data: user.errands.map((user) => user.toJson()),
      });
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  public getErrandById(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;

      const user = new UserRepository().get(userId);

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

  public update(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;
      const { title, description, type } = req.body;

      const user = new UserRepository().get(userId);

      if (!user) {
        return ApiResponse.notFound(res, "User");
      }

      const errandRepository = new ErrandRepository();
      const errand = errandRepository.get(idErrand);

      if (!errand) {
        return ApiResponse.notFound(res, "Errand");
      }

      if (!title || !description || !type) {
        return ApiResponse.invalid(res, "Errand");
      }

      errand.title = title;
      errand.description = description;
      errand.type = type;

      return ApiResponse.success(
        res,
        "Errand was successfully updated",
        errand
      );
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { userId, idErrand } = req.params;

      const user = new UserRepository().get(userId);

      if (!user) {
        return ApiResponse.notFound(res, "User");
      }

      const errandRepository = new ErrandRepository();
      const errand = errandRepository.getIndex(idErrand);

      if (errand === -1) {
        return ApiResponse.notFound(res, "Errand");
      }

      const deletedErrand = errandRepository.delete(errand);

      return ApiResponse.success(
        res,
        "Successfully deleted errand",
        deletedErrand[0].toJson()
      );
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }
}
