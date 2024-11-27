import { ValidationErrors } from '@angular/forms';
import { OneValidatorPipe } from './one-validator.pipe';

describe('OneValidatorPipe', () => {
  let oneValidatorPipe: OneValidatorPipe;

  beforeEach(() => {
    oneValidatorPipe = new OneValidatorPipe();
  });

  it('should create an instance', () => {
    expect(oneValidatorPipe).toBeTruthy();
  });

  it('should return null as per NOT error provided', () => {
    expect(oneValidatorPipe.transform(false, ['test'])).toBe(null);
  });

  it('should return required', () => {
    const oneErrorRequired: ValidationErrors = { required: true };

    expect(oneValidatorPipe.transform(oneErrorRequired, ['required'])).toEqual(
      oneErrorRequired
    );
  });

  it('should return minlength', () => {
    const oneErrorMinlength: ValidationErrors = { minlength: true };

    expect(
      oneValidatorPipe.transform(oneErrorMinlength, ['minlength'])
    ).toEqual(oneErrorMinlength);
  });

  it('should return passwordSecure', () => {
    const oneErrorPasswordSecure: ValidationErrors = { passwordSecure: true };

    expect(
      oneValidatorPipe.transform(oneErrorPasswordSecure, ['passwordSecure'])
    ).toEqual(oneErrorPasswordSecure);
  });

  it('should NOT return random error', () => {
    const oneErrorRequired: ValidationErrors = { errorRandom: true };

    expect(oneValidatorPipe.transform(oneErrorRequired, ['test'])).not.toEqual(
      oneErrorRequired
    );
  });
});
