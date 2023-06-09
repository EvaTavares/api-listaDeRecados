import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class UserMiddleware {
  public static validateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "Id was not found" });
      }
      next();
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
