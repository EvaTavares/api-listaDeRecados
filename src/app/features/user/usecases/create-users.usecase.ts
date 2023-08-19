import { User } from "../../../models/user";
import { Result, UsecaseResponse, Usecase } from "../../../shared/util/index";
import { UserRepository } from "../repositories/user.repository";

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export class CreateUsersUsecase implements Usecase {
  public async execute(params: CreateUserParams): Promise<Result> {
    const repository = new UserRepository();
    const validEmail = await repository.getByEmail(params.email);

    if (validEmail) {
      return UsecaseResponse.invalidField("User", "Already exists");
    }

    const newUser = new User(params.name, params.email, params.password);
    await repository.create(newUser);

    // cache

    return UsecaseResponse.created("User successfully created", newUser);
  }
}
