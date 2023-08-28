import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  skip,
  takeUntil,
} from 'rxjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { Store } from '@ngrx/store';
import { createPosts } from 'src/app/modules/core/store/posts/posts.actions';
import { getPosts } from 'src/app/modules/core/store/posts/posts.selector';

import { Post } from '../../models/post.model';

import { PostService } from '../../services/post/post.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { buttonTextCreateForm, titleCreateForm } from '../../const/post';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, CommonModule],
})
export class NavbarComponent implements OnInit, OnDestroy {
  destroyed$: Subject<void> = new Subject<void>();
  postList: Post[] = [];
  isPostsPage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private store: Store,
    private postService: PostService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPostsInNavBar();
    this.getRoute();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }

  openDialogToCreatePost(): void {
    this.dialogService
      .dialogDispatch(titleCreateForm, buttonTextCreateForm)
      .subscribe((post: Post) => {
        if (post) {
          const newPostComplete: Post = this.postService.addUserIdInPost(
            this.postList,
            post
          );

          this.store.dispatch(createPosts({ post: { ...newPostComplete } }));
        }
      });
  }

  logOut(): void {
    this.router.navigate(['/master']);
  }

  private getRoute(): void {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        event.urlAfterRedirects === '/posts'
          ? this.isPostsPage$.next(true)
          : this.isPostsPage$.next(false);
      });
  }

  private getPostsInNavBar(): void {
    this.store
      .select(getPosts)
      .pipe(takeUntil(this.destroyed$), skip(1))
      .subscribe((res) => (this.postList = res));
  }
}