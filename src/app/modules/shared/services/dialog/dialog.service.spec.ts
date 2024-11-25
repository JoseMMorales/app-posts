import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { MatDialog } from '@angular/material/dialog';

import { postMocked } from 'src/app/modules/core/testing/mock/post.mock';
import { MatDialogMock } from 'src/app/modules/core/testing/stub/dialog.service.mock';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: MatDialog, useClass: MatDialogMock },
      ],
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch dialog container', () => {
    service.dialogDispatch('title', 'submit').subscribe((res) => {
      expect(res).toEqual(postMocked);
    });
  });
});
