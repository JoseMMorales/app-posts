import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { PasswordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  @Output() loginValuesSubmitted: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  get email(): AbstractControl {
    return this.loginForm.controls['email'];
  }

  get password(): AbstractControl {
    return this.loginForm.controls['password'];
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  onSubmit(): void {
    const email: string = this.loginForm.value.email;
    this.loginForm.valid && this.loginValuesSubmitted.emit(email);
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(4), PasswordValidator()],
      ],
    });
  }
}
