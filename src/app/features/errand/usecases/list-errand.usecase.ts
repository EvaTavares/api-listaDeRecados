import { StatusErrand } from "../../../models/errand";
import { ErrandRepository } from "../repositories/errand.repository";
import { Result, Usecase, UsecaseResponse } from "../../../shared/util";
import { UserRepository } from "../../user/repositories/user.repository";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";

interface ListErrandParams {
  userId: string;  
  title: string;
  description: string;
  type: StatusErrand;
}

export class ListErrandUsecase implements Usecase {
  public async execute(params: ListErrandParams): Promise<Result> {
    const user = await new UserRepository().getById(params.userId);

    if (!user) {
      return UsecaseResponse.notFound("User was not found");
    }

    const cacheRepository = new CacheRepository();
    const cacheErrand = await cacheRepository.get(params.userId)

    const result = await new ErrandRepository().list({
      userId: params.userId,
      title: params.title,
      description: params.description,
      type: params.type
    })

    if(cacheErrand){
      return UsecaseResponse.success("Errands successfully listed", result)
    }

    await cacheRepository.setEx("Errand", 500, result)

    return UsecaseResponse.success(" Errands successfully listed", result.map((errand)=> errand.toJson()));
  }
}
