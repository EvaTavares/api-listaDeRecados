import { Result } from "../../../shared/contracts/result.contract";
import { UsecaseResponse } from "../../../shared/util";

import { UserRepository } from "../repositories/user.repository";

interface LoginParams {
  email: string;
  password: string;
}

export class LoginUsecase {
  public async execute(params: LoginParams): Promise<Result> {
    const user = await new UserRepository().getByEmail(params.email);

    if (!user) {
      return UsecaseResponse.invalidCredentials();
      // return ApiResponse.invalidCredentials(res);
    }

    if (user.password !== params.password) {
      return UsecaseResponse.invalidCredentials();
      // return ApiResponse.invalidCredentials(res);
    }

    return UsecaseResponse.success("Login feito com sucesso", {
      id: user.id,
      name: user.name,
    });
  }
}
