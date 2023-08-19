import { Result } from "../../../shared/contracts/result.contract";
import { UsecaseResponse } from "../../../shared/util/response.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { ErrandRepository } from "../repositories/errand.repository";

interface UpdateErrandParams {
  userId: string;
  idErrand: string;
  title: string;
  description: string;
}

export class UpdateErrandUsecase {
  /**
   * executa o usecase de atualização do errand
   * @param params ID do user e do errand + valores a serem atualizados
   * @returns lista de errands atualizada
   */
  public async execute(params: UpdateErrandParams): Promise<Result> {
    // verifica se o usuário existe
    const user = await new UserRepository().getById(params.userId);

    if (!user) {
      return UsecaseResponse.notFound("User");
    }

    //  Busca o recado no BD
    const errandRepository = new ErrandRepository();
    // tem que ser do tipo errand | undefined
    const errand = await errandRepository.getByIdErrand(params.idErrand);

    if (!errand) {
      return UsecaseResponse.notFound("Errand");
    }

    // Apenas atualiza os dados se forem informados nos params
    if (params.title) {
      errand.title = params.title;
    }

    if (params.description) {
      errand.description = params.description;
    }

    // salvar...
    await errandRepository.update(errand);

    const errands = await errandRepository.list({
      userId: params.userId,
    });

    return UsecaseResponse.success(
      "Errand successfully updated",
      errands.map((errand) => errand.toJson())
    );
  }
}
