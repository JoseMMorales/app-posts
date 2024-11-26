import { Injectable } from '@angular/core';

import { Post } from '../../models/post.model';
import { emptyPost } from '../../const/post';

@Injectable()
export class PostService {
  constructor() {}

  addUserIdInPost(postList: Post[], postCreated: Post): Post {
    let newPostWithId: Post = emptyPost;

    const { userId } = postList.reduce((prev, current) => {
      return Number(prev.userId) > Number(current.userId) ? prev : current;
    }, emptyPost);

    if (userId) {
      newPostWithId = {
        ...postCreated,
        userId: userId + 1,
      };
    }

    return newPostWithId;
  }
}
