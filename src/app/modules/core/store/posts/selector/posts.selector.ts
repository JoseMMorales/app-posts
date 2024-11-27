import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from '../posts.state';

const getPostsState = createFeatureSelector<PostState>('posts');

export const selectPosts = createSelector(getPostsState, state => {
  return state.posts;
});

export const selectIsPostsLoading = createSelector(getPostsState, state => {
  return state.isLoading;
});
