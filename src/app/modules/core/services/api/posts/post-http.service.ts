import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

import { Post } from '../../../../shared/models/post.model';
import { Comment } from 'src/app/modules/shared/models/comment.model';

@Injectable()
export class PostHttpService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    const endPoint = `${environment.baseURL}/posts`;

    return this.http.get<Post[]>(endPoint);
  }

  createPost(post: Post): Observable<Post> {
    const { title, body, userId } = post;
    const endPoint = `${environment.baseURL}/posts`;
    const bodyToSend: Post = {
      title: title,
      body: body,
      userId: userId,
    };

    return this.http.post<Post>(endPoint, bodyToSend);
  }

  updatePost(post: Post): Observable<Post> {
    const endPoint = `${environment.baseURL}/posts/${post.id}`;
    const body: Post = {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    };

    return this.http.put<Post>(endPoint, body);
  }

  deletePost(id: number): Observable<void> {
    const endPoint = `${environment.baseURL}/posts/${id}`;

    return this.http.delete<void>(endPoint);
  }

  getPostComments(): Observable<Comment[]> {
    const endPoint = `${environment.baseURL}/comments`;

    return this.http.get<Comment[]>(endPoint);
  }
}
