import { AccountModel } from '@/domain/models';
import { AddAccount } from '@/domain/usecases';

export namespace AddAccountRepository {
  export type Params = AddAccount.Params;
  export type Result = AccountModel;
}

export interface AddAccountRepository {
  add(account: AddAccountRepository.Params): Promise<AddAccountRepository.Result>;
}
