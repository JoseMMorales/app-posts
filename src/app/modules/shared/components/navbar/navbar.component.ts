import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, skip, takeUntil } from 'rxjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { Store } from '@ngrx/store';
import { selectPosts } from 'src/app/modules/core/store/posts/selector/posts.selector';

import { Post } from '../../models/post.model';

import { PostService } from '../../services/post/post.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { buttonTextCreateForm, titleCreateForm } from '../../const/post';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DestroyService } from '../../services/destroy/destroy.service';
import { PostsCreateActions } from 'src/app/modules/core/store/posts/posts.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, CommonModule],
})
export class NavbarComponent implements OnInit {
  postList: Post[] = [];
  isPostsPage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private store: Store,
    private postService: PostService,
    private dialogService: DialogService,
    private router: Router,
    private destroyed$: DestroyService
  ) {}

  ngOnInit(): void {
    this.getPostsInNavBar();
    this.getRoute();
  }

  openDialogToCreatePost(): void {
    this.dialogService
      .dialogDispatch(titleCreateForm, buttonTextCreateForm)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((post: Post) => {
        if (post) {
          const newPostComplete: Post = this.postService.addUserIdInPost(
            this.postList,
            post
          );

          this.store.dispatch(
            PostsCreateActions.create({ post: { ...newPostComplete } })
          );
        }
      });
  }

  logOut(): void {
    this.router.navigate(['/home']);
  }

  private getRoute(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        filter((event: any) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        event.urlAfterRedirects === '/posts'
          ? this.isPostsPage$.next(true)
          : this.isPostsPage$.next(false);
      });
  }

  private getPostsInNavBar(): void {
    this.store
      .select(selectPosts)
      .pipe(takeUntil(this.destroyed$), skip(1))
      .subscribe((res) => (this.postList = res));
  }
}
