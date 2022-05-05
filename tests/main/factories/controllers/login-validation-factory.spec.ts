import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/validations/validators';
import { Validation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/validators';
import { makeLoginValidation } from '@/main/factories';

jest.mock('@/validations/validators/validation-composite');

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
