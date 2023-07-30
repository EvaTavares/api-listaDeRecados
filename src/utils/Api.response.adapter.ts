import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class ApiResponse {
  public static success(res: Response, message: string, data: any) {
    return res.status(StatusCodes.OK).send({
      ok: true,
      message,
      data,
    });
  }

  public static created(res: Response, message: string, data: any) {
    return res.status(StatusCodes.CREATED).send({
      ok: true,
      message,
      data,
    });
  }

  public static fieldNotProvided(res: Response, field: string) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      ok: false,
      message: field + "was not provided",
    });
  }

  public static notFound(res: Response, entity: string) {
    return res.status(StatusCodes.NOT_FOUND).send({
      ok: false,
      messagem: entity + "not found",
    });
  }

  public static invalid(res: Response, field: string) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      ok: false,
      message: field + " is invalid",
    });
  }

  public static invalidCredentials(res: Response) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      ok: false,
      message: "Unauthorized access",
    });
  }

  public static genericError(res: Response, error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      ok: false,
      message: error.toString(),
    });
  }
}
