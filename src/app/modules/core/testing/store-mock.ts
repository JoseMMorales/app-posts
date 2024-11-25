import { of } from 'rxjs';

export class StoreMock {
  select = jasmine.createSpy().and.returnValue(of(''));
  dispatch = jasmine.createSpy();
}
