import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/Api.response.adapter";
import { Errand } from "../models/errand";

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

      const types = Object.values(Errand);

      if (!types.includes(type)) {
        return ApiResponse.invalid(res, "Type");
      }

      next();
    } catch (error: any) {
      return ApiResponse.genericError(res, error);
    }
  }
}
