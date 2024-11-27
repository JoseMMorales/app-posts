import { createSelector } from '@ngrx/store';
import { selectIsPostsLoading } from '../posts/selector/posts.selector';

export const getIsSpinnerVisible = createSelector(
  selectIsPostsLoading,

  isPostsLoading => {
    const isSpinnerVisible: boolean = isPostsLoading;

    return isSpinnerVisible;
  }
);
