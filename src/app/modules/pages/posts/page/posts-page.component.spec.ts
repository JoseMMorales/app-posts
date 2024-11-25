import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Store, StoreModule } from '@ngrx/store';
import { appReducer } from 'src/app/modules/core/store/app.state';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StoreMock } from 'src/app/modules/core/testing/store-mock';

import { DialogService } from 'src/app/modules/shared/services/dialog/dialog.service';
import { PostsPageComponent } from './posts-page.component';
import { DestroyService } from 'src/app/modules/shared/services/destroy/destroy.service';

describe('PostsPageComponent', () => {
  let component: PostsPageComponent;
  let fixture: ComponentFixture<PostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsPageComponent],
      providers: [
        {
          provider: Store,
          useClass: StoreMock,
        },
        DialogService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: {} },
        DestroyService,
      ],
      imports: [StoreModule.forRoot(appReducer)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
