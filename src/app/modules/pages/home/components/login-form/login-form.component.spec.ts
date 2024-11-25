import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginFormComponent } from './login-form.component';
import { OneValidatorPipe } from '../../pipes/one-validator.pipe';

export const formData = {
  email: 'something@somewhere.com',
  password: '8938nDisn@din',
};

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let debugElementForm: DebugElement;
  let buttonSubmit: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        OneValidatorPipe,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    debugElementForm = fixture.debugElement.query(By.css('form'));
    buttonSubmit = debugElementForm.nativeElement.querySelector('button');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return email control', () => {
    expect(component.email).toBe(component.loginForm.controls['email']);
  });

  it('should return password control', () => {
    expect(component.password).toBe(component.loginForm.controls['password']);
  });

  it('should test if submit button is disabled when the form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    fixture.detectChanges();

    expect(buttonSubmit.disabled).toBeTruthy();
  });

  it('should set values after ngOnInit() and valid form', () => {
    component.ngOnInit();
    component.loginForm.setValue(formData);

    expect(component.loginForm.getRawValue()).toEqual(formData);
    expect(component.loginForm.valid).toBe(true);
  });

  it('should set required validator in email/password fields', () => {
    component.ngOnInit();

    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    expect(component.loginForm.hasError('required', ['email'])).toBe(true);
    expect(component.loginForm.hasError('required', ['password'])).toBe(true);
  });

  it('should set email validator in email field', () => {
    component.ngOnInit();

    component.loginForm.controls['email'].setValue('a');

    expect(component.loginForm.hasError('email', ['email'])).toBe(true);
  });

  it('should pass validators in email field', () => {
    component.ngOnInit();

    component.loginForm.controls['email'].setValue('email@email.com');

    expect(component.loginForm.hasError('email', ['email'])).toBe(false);
    expect(component.loginForm.hasError('required', ['email'])).toBe(false);
  });

  it('should set minLength validator in password field', () => {
    component.ngOnInit();

    component.loginForm.controls['password'].setValue('AAA');

    expect(component.loginForm.hasError('minlength', ['password'])).toBe(true);
  });

  it('should pass minLength validator in password field', () => {
    component.ngOnInit();

    component.loginForm.controls['password'].setValue('AAAA');

    expect(component.loginForm.hasError('minlength', ['password'])).toBe(false);
  });

  it('should set passwordSecure validator in password field', () => {
    component.ngOnInit();

    component.loginForm.controls['password'].setValue('AAAA');

    expect(component.loginForm.hasError('passwordSecure', ['password'])).toBe(
      true
    );
  });

  it('should pass passwordSecure validator in password field', () => {
    component.ngOnInit();

    component.loginForm.controls['password'].setValue('AAAAaaa2');

    expect(component.loginForm.hasError('passwordSecure', ['password'])).toBe(
      false
    );
  });

  it('should emit email when onSubmit method is called', () => {
    const spyEmit = spyOn(component.loginValuesSubmitted, 'emit');
    component.loginForm.setValue(formData);

    component.onSubmit();

    expect(spyEmit).toHaveBeenCalledWith(formData.email);
  });

  it('should call onSubmit method as form has been populated', () => {
    spyOn(component, 'onSubmit');
    component.loginForm.setValue(formData);

    debugElementForm.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should NOT call submitForm method as data is not entered to the form(invalid)', () => {
    spyOn(component, 'onSubmit');

    buttonSubmit.click();

    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });
});
