import { AddAccount } from '@/domain/usecases';

export namespace AddAccountRepository {
  export type Params = AddAccount.Params;
  export type Result = boolean;
}

export interface AddAccountRepository {
  add(account: AddAccountRepository.Params): Promise<AddAccountRepository.Result>;
}
