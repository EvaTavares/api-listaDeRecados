import { Result } from "./result.contract";

export interface Usecase {
  execute: (params?: any) => Promise<Result>;
}
