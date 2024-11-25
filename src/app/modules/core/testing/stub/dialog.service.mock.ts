import { of } from 'rxjs';
import { postMocked } from '../mock/post.mock';

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(postMocked),
    };
  }
}
