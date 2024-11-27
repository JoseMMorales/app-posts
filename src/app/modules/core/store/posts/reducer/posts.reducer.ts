import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { PostState, initialState } from '../posts.state';
import {
  PostsCommentActions,
  PostsCreateActions,
  PostsDeleteActions,
  PostsLoadActions,
  PostsUpdateActions,
} from '../posts.actions';
import { Comment } from 'src/app/modules/shared/models/comment.model';
import { Post } from 'src/app/modules/shared/models/post.model';

const _postsReducer: ActionReducer<PostState, Action> = createReducer(
  initialState,
  on(PostsLoadActions.load, state => {
    return { ...state, isLoading: true };
  }),
  on(PostsLoadActions.loadSuccess, (state, action) => {
    return { ...state, posts: action.posts, isLoading: false };
  }),
  on(PostsLoadActions.loadFailed, state => {
    return { ...state, isLoading: false };
  }),

  on(PostsCreateActions.create, state => {
    return { ...state, isLoading: true };
  }),
  on(PostsCreateActions.createSuccess, (state, action) => {
    return { ...state, posts: action.posts, isLoading: false };
  }),
  on(PostsCreateActions.createFailed, state => {
    return { ...state, isLoading: false };
  }),

  on(PostsUpdateActions.update, state => {
    return { ...state, isLoading: true };
  }),
  on(PostsUpdateActions.updateSuccess, (state, action) => {
    return { ...state, posts: action.posts, isLoading: false };
  }),
  on(PostsUpdateActions.updateFailed, state => {
    return { ...state, isLoading: false };
  }),

  on(PostsDeleteActions.delete, (state, action) => {
    return { ...state, isLoading: true, id: action.id };
  }),
  on(PostsDeleteActions.deleteSuccess, (state, action) => {
    return { ...state, posts: action.posts, isLoading: false };
  }),
  on(PostsDeleteActions.deleteFailed, state => {
    return { ...state, isLoading: false };
  }),

  on(PostsCommentActions.commentLoad, state => {
    return { ...state, isLoading: true };
  }),
  on(PostsCommentActions.commentSuccess, (state, action) => {
    const postsInStore = state.posts;

    const postsArrayUpdated: Post[] = postsInStore.map(postInStore => {
      return {
        ...postInStore,
        comments: action.comments.filter((comment: Comment) => {
          return comment.postId === postInStore.id;
        }),
      };
    });

    return { ...state, posts: [...postsArrayUpdated], isLoading: false };
  }),
  on(PostsCommentActions.commentFailed, state => {
    return { ...state, isLoading: false };
  })
);

export function postsReducer(state: PostState | undefined, action: Action) {
  return _postsReducer(state, action);
}
