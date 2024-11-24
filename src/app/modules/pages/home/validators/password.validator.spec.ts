import { TestBed } from '@angular/core/testing';
import { PasswordValidator } from './password.validator';
import { FormControl } from '@angular/forms';

describe('RequiredValidator', () => {
  const passwordValidator = PasswordValidator();
  let control: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordValidator],
    }).compileComponents();

    control = new FormControl('password');
  });

  it('should create', () => {
    expect(passwordValidator).toBeTruthy();
  });

  it('should return passwordSecure as password is not LowerCase && NumberCase', () => {
    control.setValue('AAA');
    expect(passwordValidator(control)).toEqual({ passwordSecure: true });
  });

  it('should return passwordSecure as password is not LowerCase && NumberCase', () => {
    control.setValue('aaa');
    expect(passwordValidator(control)).toEqual({ passwordSecure: true });
  });

  it('should return passwordSecure as password is not LowerCase && NumberCase', () => {
    control.setValue('1234');
    expect(passwordValidator(control)).toEqual({ passwordSecure: true });
  });

  it('should return passwordSecure as password is not LowerCase', () => {
    control.setValue('AAA123');
    expect(passwordValidator(control)).toEqual({ passwordSecure: true });
  });

  it('should return passwordSecure as password is not UpperCase', () => {
    control.setValue('aaa123');
    expect(passwordValidator(control)).toEqual({ passwordSecure: true });
  });

  it('should return passwordSecure as password is not NumberCase', () => {
    control.setValue('aaaAAA');
    expect(passwordValidator(control)).toEqual({ passwordSecure: true });
  });

  it('should return passwordSecure as password is not NumberCase', () => {
    control.setValue('AAAaaa123');
    expect(passwordValidator(control)).toBeNull();
  });
});
