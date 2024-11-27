import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom,
} from 'rxjs';

import {
  Actions,
  CreateEffectMetadata,
  createEffect,
  ofType,
} from '@ngrx/effects';
import {
  PostsCommentActions,
  PostsCreateActions,
  PostsDeleteActions,
  PostsLoadActions,
  PostsUpdateActions,
} from '../posts.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';

import { PostHttpService } from '../../../services/api/posts/post-http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Post } from '../../../../shared/models/post.model';
import { TypedAction } from '@ngrx/store/src/models';
import { selectPosts } from '../selector/posts.selector';

@Injectable()
export class PostsEffects {
  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private postService: PostHttpService,
    private snackBar: MatSnackBar
  ) {}

  loadPosts$: Observable<
    ({ posts: Post[] } & TypedAction<string>) | TypedAction<string>
  > &
    CreateEffectMetadata = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsLoadActions.load),
      mergeMap(() => {
        return this.postService.getPosts().pipe(
          map(postsResponse => {
            return PostsLoadActions.loadSuccess({ posts: postsResponse });
          }),
          catchError(error => of(PostsLoadActions.loadFailed(error)))
        );
      })
    );
  });

  createPosts$: Observable<
    ({ posts: Post[] } & TypedAction<string>) | TypedAction<string>
  > &
    CreateEffectMetadata = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsCreateActions.create),
      withLatestFrom(this.store$.select(selectPosts)),
      mergeMap(([action, postState]) => {
        return this.postService.createPost(action.post).pipe(
          map(postResponse => {
            const postsInStore = postState;
            const postsArrayUpdated = [postResponse, ...postsInStore];

            return PostsCreateActions.createSuccess({
              posts: [...postsArrayUpdated],
            });
          }),
          catchError(error =>
            of(PostsCreateActions.createFailed({ payload: error }))
          )
        );
      })
    );
  });

  updatePosts$: Observable<
    ({ posts: Post[] } & TypedAction<string>) | TypedAction<string>
  > &
    CreateEffectMetadata = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsUpdateActions.update),
      withLatestFrom(this.store$.select(selectPosts)),
      mergeMap(([action, storeState]) => {
        return this.postService.updatePost(action.post).pipe(
          map(postResponseFromAPI => {
            const postsInStore = storeState;

            const postsArrayUpdated = postsInStore.map(postInStore => {
              if (postInStore.id === postResponseFromAPI.id) {
                return {
                  ...postInStore,
                  body: postResponseFromAPI.body,
                  title: postResponseFromAPI.title,
                };
              }
              return postInStore;
            });

            return PostsUpdateActions.updateSuccess({
              posts: [...postsArrayUpdated],
            });
          }),
          catchError(error =>
            of(PostsUpdateActions.updateFailed({ payload: error }))
          )
        );
      })
    );
  });

  deletePosts$: Observable<
    ({ id: number } & TypedAction<string>) | TypedAction<string>
  > &
    CreateEffectMetadata = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsDeleteActions.delete),
      withLatestFrom(this.store$.select(selectPosts)),
      mergeMap(([action, storeState]) => {
        return this.postService.deletePost(action.id).pipe(
          map(() => {
            const postsInStore = storeState;
            const postRemoved = action.id;
            const postsArrayUpdated = postsInStore.filter(
              post => post.id !== postRemoved
            );

            return PostsDeleteActions.deleteSuccess({
              posts: [...postsArrayUpdated],
            });
          }),
          catchError(error =>
            of(PostsDeleteActions.deleteFailed({ payload: error }))
          )
        );
      })
    );
  });

  loadComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsCommentActions.commentLoad),
      mergeMap(() => {
        return this.postService.getPostComments().pipe(
          map(commentsResponse => {
            return PostsCommentActions.commentSuccess({
              comments: [...commentsResponse],
            });
          }),
          catchError(error =>
            of(PostsCommentActions.commentFailed({ payload: error }))
          )
        );
      })
    );
  });

  postsErrors$: Observable<
    | ({ payload: { message: string } } & TypedAction<string>)
    | TypedAction<string>
  > &
    CreateEffectMetadata = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          PostsLoadActions.loadFailed,
          PostsCreateActions.createFailed,
          PostsUpdateActions.updateFailed,
          PostsDeleteActions.deleteFailed,
          PostsCommentActions.commentFailed
        ),
        tap(({ payload }) => {
          this.snackBar.open(payload.message, 'Close');
        })
      ),
    { dispatch: false }
  );
}
