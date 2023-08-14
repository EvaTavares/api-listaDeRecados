import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../../shared/util/Api.response.adapter";
import { Errand, StatusErrand } from "../../../models/errand";

export class ErrandMiddleware {
  public static validateFieldsCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, description, type } = req.body;

      if (!title) {
        return ApiResponse.fieldNotProvided(res, "Title");
      }

      if (!description) {
        return ApiResponse.fieldNotProvided(res, "Description");
      }

      if (!type) {
        return ApiResponse.fieldNotProvided(res, "Type");
      }

      const allowedTypes = Object.values(StatusErrand);

      if (!allowedTypes.includes(type)) {
        return ApiResponse.invalid(res, "Type");
      }

      next();
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }
}
