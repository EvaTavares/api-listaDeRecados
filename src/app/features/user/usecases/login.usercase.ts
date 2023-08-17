import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adapter";
import { UserRepository } from "../repositories/user.repository";

interface LoginParams {
  email: string;
  password: string;
}

export class LoginUsecase {
  public async execute(params: LoginParams): Promise<Result> {
    const user = await new UserRepository().getByEmail(params.email);

    if (!user) {
      return Return.invalidCredentials();
      // return ApiResponse.invalidCredentials(res);
    }

    if (user.password !== params.password) {
      return Return.invalidCredentials();
      // return ApiResponse.invalidCredentials(res);
    }

    return Return.success("Login feito com sucesso", {
      id: user.id,
      name: user.name,
    });
  }
}
