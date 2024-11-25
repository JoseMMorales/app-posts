import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import {
  postResponseMocked,
  postResponseReverseMocked,
  postMocked,
  postThirdMocked,
} from 'src/app/modules/core/testing/mock/post.mock';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add user id in post (prev)', () => {
    expect(service.addUserIdInPost(postResponseMocked, postMocked)).toEqual(
      postThirdMocked
    );
  });

  it('should add user id in post (current)', () => {
    expect(
      service.addUserIdInPost(postResponseReverseMocked, postMocked)
    ).toEqual(postThirdMocked);
  });
});
