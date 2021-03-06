import { Validation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/validators';
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/validations/validators';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
