import { PasswordSecureDirective } from './password-secure.directive';
import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';

describe('PasswordSecureDirective', () => {
  let directive: PasswordSecureDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [PasswordValidator]
    });

    directive = new PasswordSecureDirective();
  });


  it('should create a directive instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should call passwordValidator when call the directive', () => {
    expect(directive.validate(new FormControl('password'))).toEqual({
      passwordSecure: true,
    });
  });

  it('should the directive return null', () => {
    const fb: FormBuilder = new FormBuilder();

    const formGroupMock = fb.group({
      password: '',
    });

    expect(directive.validate(formGroupMock.controls['password'])).toBeNull();
  });
});
