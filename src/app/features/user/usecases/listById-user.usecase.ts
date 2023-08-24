import { Result } from "../../../shared/contracts/result.contract";
import { Usecase, UsecaseResponse } from "../../../shared/util";
import { UserRepository } from "../repositories/user.repository";

interface ListByIdParams {
  id: string;
}

export class ListByIdUsecase implements Usecase {
  public async execute(params: ListByIdParams): Promise<Result> {
    const repository = new UserRepository();
    const result = await repository.getById(params.id);

    if (!result) {
      return UsecaseResponse.notFound("User ");
    }

    return UsecaseResponse.success("User successufully listed", result.toJson());
  }
}
