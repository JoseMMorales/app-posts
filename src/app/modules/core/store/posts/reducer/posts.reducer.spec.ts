import * as reducer from './posts.reducer';
import { initialState } from '../posts.state';
import {
  PostsCommentActions,
  PostsCreateActions,
  PostsDeleteActions,
  PostsLoadActions,
  PostsUpdateActions,
} from '../posts.actions';
import {
  postResponseMocked,
  postMocked,
  postWithCommentMocked,
} from '../../../testing/mock/post.mock';
import { commentResponseMocked } from '../../../testing/mock/comment.mock';

describe('PostsReducer', () => {
  it('should be created', () => {
    const action = {
      type: 'Unknown',
    };
    const state = reducer.postsReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  describe('PostsLoadActions', () => {
    it('should load', () => {
      const action = PostsLoadActions.load();
      const state = reducer.postsReducer(initialState, action);

      expect(state).not.toEqual(initialState);
      expect(state.isLoading).toBe(true);
    });

    it('should loadSuccess', () => {
      const action = PostsLoadActions.loadSuccess({
        posts: postResponseMocked,
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state.posts).toEqual(postResponseMocked);
      expect(state).not.toEqual(initialState);
    });

    it('should loadFailed', () => {
      const action = PostsLoadActions.loadFailed({
        payload: {
          message: 'error',
        },
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('PostsCreateActions', () => {
    it('should create', () => {
      const action = PostsCreateActions.create({
        post: postMocked,
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state).not.toEqual(initialState);
      expect(state.isLoading).toBe(true);
    });

    it('should createSuccess', () => {
      const action = PostsCreateActions.createSuccess({
        posts: postResponseMocked,
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state.posts).toEqual(postResponseMocked);
      expect(state).not.toEqual(initialState);
    });

    it('should createFailed', () => {
      const action = PostsCreateActions.createFailed({
        payload: {
          message: 'error',
        },
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('PostsUpdateActions', () => {
    it('should update', () => {
      const action = PostsUpdateActions.update({
        post: postMocked,
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state).not.toEqual(initialState);
      expect(state.isLoading).toBe(true);
    });

    it('should updateSuccess', () => {
      const action = PostsUpdateActions.updateSuccess({
        posts: postResponseMocked,
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state.posts).toEqual(postResponseMocked);
      expect(state).not.toEqual(initialState);
    });

    it('should updateFailed', () => {
      const action = PostsUpdateActions.updateFailed({
        payload: {
          message: 'error',
        },
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('PostsDeleteActions', () => {
    it('should delete', () => {
      const action = PostsDeleteActions.delete({
        id: 1,
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state).not.toEqual(initialState);
      expect(state.isLoading).toBe(true);
    });

    it('should deleteSuccess', () => {
      const action = PostsDeleteActions.deleteSuccess({
        posts: postResponseMocked,
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state.posts).toEqual(postResponseMocked);
      expect(state).not.toEqual(initialState);
    });

    it('should deleteFailed', () => {
      const action = PostsDeleteActions.deleteFailed({
        payload: {
          message: 'error',
        },
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('PostsCommentActions', () => {
    it('should comment', () => {
      const action = PostsCommentActions.commentLoad();
      const state = reducer.postsReducer(initialState, action);

      expect(state).not.toEqual(initialState);
      expect(state.isLoading).toBe(true);
    });

    it('should commentSuccess with comments', () => {
      const action = PostsCommentActions.commentSuccess({
        comments: commentResponseMocked,
      });
      const state = reducer.postsReducer(
        {
          posts: [postMocked],
          isLoading: true,
        },
        action
      );

      expect(state.posts).toEqual([postWithCommentMocked]);
      expect(state).not.toEqual(initialState);
    });

    it('should commentFailed', () => {
      const action = PostsCommentActions.commentFailed({
        payload: {
          message: 'error',
        },
      });
      const state = reducer.postsReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });
});
