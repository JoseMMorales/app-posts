import { Post } from '../models/post.model';

export const emptyPost: Post = {
  title: '',
  body: '',
  id: 0,
  userId: 0,
  comments: [],
};

export const titleCreateForm = 'Create Post';
export const buttonTextCreateForm = 'Create';
export const titleEditForm = 'Edit Post';
export const buttonTextEditForm = 'Edit';
