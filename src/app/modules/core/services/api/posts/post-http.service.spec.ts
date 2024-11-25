import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environment } from 'src/environment/environment';
import { PostHttpService } from './post-http.service';
import {
  postResponseMocked,
  postMocked,
} from '../../../testing/mock/post.mock';
import { commentResponseMocked } from '../../../testing/mock/comment.mock';

describe('PostHttpService', () => {
  let service: PostHttpService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostHttpService],
    });
    service = TestBed.inject(PostHttpService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts', () => {
    service.getPosts().subscribe((res) => {
      expect(res).toEqual(postResponseMocked);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.baseURL}/posts`,
    });

    req.flush(postResponseMocked);
  });

  it('should create post', () => {
    service.createPost(postMocked).subscribe((res) => {
      expect(res).toEqual(postMocked);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${environment.baseURL}/posts`,
    });

    req.flush(postMocked);
  });

  it('should update post', () => {
    service.updatePost(postMocked).subscribe((res) => {
      expect(res).toEqual(postMocked);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${environment.baseURL}/posts/1`,
    });

    req.flush(postMocked);
  });

  it('should delete post', () => {
    const spyDelete = spyOn(service, 'deletePost').and.callThrough();

    service.deletePost(1).subscribe(() => {
      expect(spyDelete).toHaveBeenCalled();
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${environment.baseURL}/posts/1`,
    });

    req.flush(1);
  });

  it('should get comments', () => {
    service.getPostComments().subscribe((res) => {
      expect(res).toEqual(commentResponseMocked);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.baseURL}/comments`,
    });

    req.flush(commentResponseMocked);
  });
});
