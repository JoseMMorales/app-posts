import { RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';

export const routerEvent$: Subject<RouterEvent> = new Subject<RouterEvent>();

export class RouterMock {
  events = routerEvent$;
  navigate() {}
}
