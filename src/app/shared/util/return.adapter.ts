import { Result } from "../contracts/result.contract";

export class Return {
  public static success(message: string, data: any): Result {
    return {
      ok: true,
      message,
      data,
      code: 200,
    };
  }

  public static created(message: string, data: any): Result {
    return {
      ok: true,
      message,
      data,
      code: 201,
    };
  }

  public static fieldNotProvided(field: string): Result {
    return {
      ok: false,
      message: field + "was not provided",
      code: 400,
    };
  }

  public static notFound(entity: string): Result {
    return {
      ok: false,
      message: `${entity} not found`,
      code: 404,
    };
  }

  public static invalid(field: string): Result {
    return {
      ok: false,
      message: field + " is invalid",
      code: 400,
    };
  }

  public static invalidCredentials(): Result {
    return {
      ok: false,
      message: "Unauthorized access",
      code: 401,
    };
  }

  public static genericError(error: any): Result {
    return {
      ok: false,
      message: error.toString(),
      code: 500,
    };
  }
}
