import { Result, Usecase, UsecaseResponse } from "../../../shared/util";
import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";

interface DeleteErrandParams {
    userId: string
    idErrand: string
}
export class DeleteErrandUsecase implements Usecase{
    public async execute(params: DeleteErrandParams): Promise<Result>{
        const user = await new UserRepository().getById(params.userId);

        if (!user) {
          return UsecaseResponse.notFound("User");
        }
  
        const errandRepository = new ErrandRepository();
        const delitedErrands = await errandRepository.delete(params.idErrand);
  
        if (delitedErrands === 0) {
          return UsecaseResponse.notFound("Errand");
        }
  
        const errands = await errandRepository.list({
          userId: params.userId,
        });

        return UsecaseResponse.success(
            "Errand successfully deleted",
            errands.map((errand) => errand.toJson())
          );
    }
}