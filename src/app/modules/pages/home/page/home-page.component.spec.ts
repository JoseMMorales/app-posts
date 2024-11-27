import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { OneValidatorPipe } from '../pipes/one-validator.pipe';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent, LoginFormComponent],
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

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit login values and navigate to posts', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const localStorageSpy = spyOn(
      window.localStorage,
      'setItem'
    ).and.callThrough();

    component.loginValuesSubmitted('email@email.com');

    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
    expect(localStorageSpy).toHaveBeenCalled();
  });
});
