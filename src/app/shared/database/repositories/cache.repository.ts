import { CacheDatabase } from "../../../../main/database/redis.connection";


export class CacheRepository {
  private _repository = CacheDatabase.connection;

  //get - buscar
  public async get(key: string) {
    const result = await this._repository.get(key);

    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  // set - salvar
  public async set(key: string, value: any) {
    await this._repository.set(key, JSON.stringify(value));
  }

  // set - salvar com tempo
  public async setEx(key: string, seconds: number, value: any) {
    await this._repository.setex(key, seconds, JSON.stringify(value));
  }

  // delete - apagar
  public async delete(key: string) {
    await this._repository.del(key);
  }
}