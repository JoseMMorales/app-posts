import { postResponseMocked } from '../../../testing/mock/post.mock';
import * as selector from './posts.selector';

describe('PostsSelector', () => {
  it('should return NO posts', () => {
    expect(
      selector.selectPosts.projector({
        posts: [],
        isLoading: false,
      })
    ).toEqual([]);
  });

  it('should return posts', () => {
    expect(
      selector.selectPosts.projector({
        posts: postResponseMocked,
        isLoading: false,
      })
    ).toEqual(postResponseMocked);
  });

  it('should set true loading', () => {
    expect(
      selector.selectIsPostsLoading.projector({
        posts: postResponseMocked,
        isLoading: true,
      })
    ).toEqual(true);
  });
});
