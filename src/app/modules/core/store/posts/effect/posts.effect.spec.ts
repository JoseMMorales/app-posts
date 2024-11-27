import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { initialState } from '../posts.state';

import { PostHttpService } from '../../../services/api/posts/post-http.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import {
  PostsCommentActions,
  PostsCreateActions,
  PostsDeleteActions,
  PostsLoadActions,
  PostsUpdateActions,
} from '../posts.actions';
import { selectPosts } from '../selector/posts.selector';
import { PostsEffects } from './posts.effect';

import {
  postResponseMocked,
  postResponseReverseMocked,
  postMocked,
} from '../../../testing/mock/post.mock';
import { PostHttpServiceMock } from '../../../testing/stub/post-http.service.mock';
import { commentMocked } from '../../../testing/mock/comment.mock';

describe('PostsEffects', () => {
  let effect: PostsEffects;
  let actions$: Observable<unknown>;
  let service: PostHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        PostsEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState,
          selectors: [{ selector: selectPosts, value: [postMocked] }],
        }),
        { provide: PostHttpService, useClass: PostHttpServiceMock },
      ],
    });

    effect = TestBed.inject(PostsEffects);
    service = TestBed.inject(PostHttpService);
  });

  it('should be created', () => {
    expect(effect).toBeTruthy();
  });

  describe('PostsLoadActions', () => {
    it('should dispatch PostsLoadActions.loadSuccess', () => {
      actions$ = of(PostsLoadActions.load);
      const spy = spyOn(service, 'getPosts').and.callThrough();

      const expectedAction = PostsLoadActions.loadSuccess({
        posts: postResponseMocked,
      });

      effect.loadPosts$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        expect(spy).toHaveBeenCalled();
      });
    });

    it('should dispatch PostsLoadActions.loadFailed', () => {
      actions$ = of(PostsLoadActions.load);
      const spy = spyOn(service, 'getPosts').and.returnValue(
        throwError(() => new Error('Error'))
      );

      const expectedAction = PostsLoadActions.loadFailed({
        payload: { message: 'Error' },
      });

      effect.loadPosts$.subscribe(res => {
        expect(res.type).toEqual(expectedAction.type);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('PostsCreateActions', () => {
    it('should dispatch PostsCreateActions.createSuccess', () => {
      actions$ = of(PostsCreateActions.create({ post: postMocked }));
      const spy = spyOn(service, 'createPost').and.callThrough();

      const expectedAction = PostsCreateActions.createSuccess({
        posts: postResponseReverseMocked,
      });

      effect.createPosts$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        expect(spy).toHaveBeenCalled();
      });
    });

    it('should dispatch PostsCreateActions.createFailed', () => {
      actions$ = of(PostsCreateActions.create({ post: postMocked }));
      const spy = spyOn(service, 'createPost').and.returnValue(
        throwError(() => new Error('Error'))
      );

      const expectedAction = PostsCreateActions.createFailed({
        payload: { message: 'Error' },
      });

      effect.createPosts$.subscribe(res => {
        expect(res.type).toEqual(expectedAction.type);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('PostsUpdateActions', () => {
    it('should dispatch PostsUpdateActions.createSuccess with same post', () => {
      actions$ = of(PostsUpdateActions.update({ post: postMocked }));
      const spy = spyOn(service, 'updatePost').and.callThrough();

      const expectedAction = PostsUpdateActions.updateSuccess({
        posts: [postMocked],
      });

      effect.updatePosts$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        expect(spy).toHaveBeenCalled();
      });
    });

    it('should dispatch PostsUpdateActions.updateFailed', () => {
      actions$ = of(PostsUpdateActions.update({ post: postMocked }));
      const spy = spyOn(service, 'updatePost').and.returnValue(
        throwError(() => new Error('Error'))
      );

      const expectedAction = PostsUpdateActions.updateFailed({
        payload: { message: 'Error' },
      });

      effect.updatePosts$.subscribe(res => {
        expect(res.type).toEqual(expectedAction.type);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('PostsDeleteActions', () => {
    it('should dispatch PostsDeleteActions.deleteSuccess', () => {
      actions$ = of(PostsDeleteActions.delete({ id: 1 }));
      const spy = spyOn(service, 'deletePost').and.callThrough();

      const expectedAction = PostsDeleteActions.deleteSuccess({
        posts: [],
      });

      effect.deletePosts$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        expect(spy).toHaveBeenCalled();
      });
    });

    it('should dispatch PostsDeleteActions.deleteFailed', () => {
      actions$ = of(PostsDeleteActions.delete({ id: 1 }));
      const spy = spyOn(service, 'deletePost').and.returnValue(
        throwError(() => new Error('Error'))
      );

      const expectedAction = PostsDeleteActions.deleteFailed({
        payload: { message: 'Error' },
      });

      effect.deletePosts$.subscribe(res => {
        expect(res.type).toEqual(expectedAction.type);
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('PostsCommentActions', () => {
    it('should dispatch PostsCommentActions.createSuccess', () => {
      actions$ = of(PostsCommentActions.commentLoad());
      const spy = spyOn(service, 'getPostComments').and.callThrough();

      const expectedAction = PostsCommentActions.commentSuccess({
        comments: [commentMocked],
      });

      effect.loadComments$.subscribe(res => {
        expect(res).toEqual(expectedAction);
        expect(spy).toHaveBeenCalled();
      });
    });

    it('should dispatch PostsCommentActions.commentFailed', () => {
      actions$ = of(PostsCommentActions.commentLoad());
      const spy = spyOn(service, 'getPostComments').and.returnValue(
        throwError(() => new Error('Error'))
      );

      const expectedAction = PostsCommentActions.commentFailed({
        payload: { message: 'Error' },
      });

      effect.loadComments$.subscribe(res => {
        expect(res.type).toEqual(expectedAction.type);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
