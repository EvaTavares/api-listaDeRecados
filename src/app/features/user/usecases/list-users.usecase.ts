import { Result } from "../../../shared/contracts/result.contract";
import { UserRepository } from "../repositories/user.repository";

export class ListUsersUsecase {
  public async execute(): Promise<Result> {
    const repository = new UserRepository();
    const result = await repository.list();

    return {
      ok: true,
      message: "Users successufully listed",
      data: result,
      code: 200,
    };
  }
}
