import { Component, OnInit } from '@angular/core';
import { Observable, skip, takeUntil } from 'rxjs';

import { Store } from '@ngrx/store';
import {
  PostsCommentActions,
  PostsDeleteActions,
  PostsLoadActions,
  PostsUpdateActions,
} from 'src/app/modules/core/store/posts/posts.actions';
import { selectPosts } from 'src/app/modules/core/store/posts/selector/posts.selector';

import {
  buttonTextEditForm,
  emptyPost,
  titleEditForm,
} from 'src/app/modules/shared/const/post';
import { Post } from 'src/app/modules/shared/models/post.model';
import { DialogService } from 'src/app/modules/shared/services/dialog/dialog.service';
import { getIsSpinnerVisible } from 'src/app/modules/core/store/spinner/spinner.selector';
import { DestroyService } from 'src/app/modules/shared/services/destroy/destroy.service';
import { PostSort } from 'src/app/modules/shared/const/sort';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
})
export class PostsPageComponent implements OnInit {
  postList: Post[] = [];
  postToRender: Post[] = [];
  isGLobalSpinnerVisible$: Observable<boolean>;

  constructor(
    private store: Store,
    private dialogService: DialogService,
    private destroyed$: DestroyService
  ) {
    this.store.dispatch(PostsLoadActions.load());
    this.store.dispatch(PostsCommentActions.commentLoad());
    this.isGLobalSpinnerVisible$ = this.store.select(getIsSpinnerVisible);
  }

  ngOnInit(): void {
    this.getAndSetPosts();
  }

  deletePost(postId: number | undefined): void {
    !!postId && this.store.dispatch(PostsDeleteActions.delete({ id: postId }));
  }

  updatePost(post: Post): void {
    const postToUpdate: Post = post;

    this.dialogService
      .dialogDispatch(titleEditForm, buttonTextEditForm)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((post: Post) => {
        let postUpdated = emptyPost;

        if (post) {
          postUpdated = {
            ...post,
            userId: postToUpdate.userId,
            id: postToUpdate.id,
          };

          this.store.dispatch(
            PostsUpdateActions.update({ post: { ...postUpdated } })
          );
        }
      });
  }

  postsFiltered(postsFiltered: Post[]): void {
    this.postToRender = postsFiltered;
  }

  sortPosts(value: string): void {
    let arraySorted: Post[] = [];

    value === PostSort.ASCENDING
      ? (arraySorted = [...this.postToRender].sort((a, b) =>
          a.title > b.title ? 1 : -1
        ))
      : (arraySorted = [...this.postToRender].sort((a, b) =>
          a.title < b.title ? 1 : -1
        ));

    this.postToRender = arraySorted;
  }

  private getAndSetPosts(): void {
    this.store
      .select(selectPosts)
      .pipe(takeUntil(this.destroyed$), skip(1))
      .subscribe((res) => {
        this.postList = res;
        this.postToRender = this.postList;
      });
  }
}
