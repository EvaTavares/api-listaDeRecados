import { Errand, StatusErrand } from "../../../models/errand";
import { Result, Usecase, UsecaseResponse } from "../../../shared/util";
import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";

interface CreateErrandParams {
    userId: string
    title: string
    description: string
    type: StatusErrand
}
export class CreateErrandUsecase implements Usecase { 
    public async execute (params:CreateErrandParams ): Promise<Result>{
        const user = await new UserRepository().getById(params.userId);

        if (!user) {
          return UsecaseResponse.notFound( "User");
        }
  
        const newErrand = new Errand(params.title, params.description, params.type, user);
        await new ErrandRepository().create(newErrand);

        // cache
  
        return UsecaseResponse.created("Errand successfully created", newErrand)
    }
}