import { Result } from "../../../shared/contracts/result.contract";
import { Usecase, UsecaseResponse } from "../../../shared/util";
import { UserRepository } from "../repositories/user.repository";

export class ListUsersUsecase implements Usecase {
  public async execute(): Promise<Result> {
    const repository = new UserRepository();
    const result = await repository.list();

    return UsecaseResponse.success("Users successufully listed", result);
  }
}
