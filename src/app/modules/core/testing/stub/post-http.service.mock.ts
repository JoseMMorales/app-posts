import { Observable, of } from 'rxjs';

import { postMocked, postSecondMocked } from '../mock/post.mock';
import { postResponseMocked } from '../../testing/mock/post.mock';

import { Post } from 'src/app/modules/shared/models/post.model';
import { Comment } from 'src/app/modules/shared/models/comment.model';
import { commentMocked } from '../mock/comment.mock';

export class PostHttpServiceMock {
  getPosts(): Observable<Post[]> {
    return of(postResponseMocked);
  }

  createPost(): Observable<Post> {
    return of(postSecondMocked);
  }

  updatePost(): Observable<Post> {
    return of(postMocked);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  deletePost(): Observable<{}> {
    return of({});
  }

  getPostComments(): Observable<Comment[]> {
    return of([commentMocked]);
  }
}
