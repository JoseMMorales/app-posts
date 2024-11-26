import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { Store, StoreModule } from '@ngrx/store';
import { appReducer } from 'src/app/modules/core/store/app.state';
import { initialState as postInitialState } from 'src/app/modules/core/store/posts/posts.state';
import { selectPosts } from 'src/app/modules/core/store/posts/selector/posts.selector';
import {
  PostsDeleteActions,
  PostsUpdateActions,
} from 'src/app/modules/core/store/posts/posts.actions';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { StoreMock } from 'src/app/modules/core/testing/store-mock';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  postMocked,
  postResponseMocked,
  postResponseReverseMocked,
} from 'src/app/modules/core/testing/mock/post.mock';

import { DialogService } from 'src/app/modules/shared/services/dialog/dialog.service';
import { PostService } from 'src/app/modules/shared/services/post/post.service';
import { DestroyService } from 'src/app/modules/shared/services/destroy/destroy.service';

import { PostsPageComponent } from './posts-page.component';
import { Post } from 'src/app/modules/shared/models/post.model';
import { PostSort } from 'src/app/modules/shared/const/sort';

describe('PostsPageComponent', () => {
  let component: PostsPageComponent;
  let fixture: ComponentFixture<PostsPageComponent>;
  let dispatchSpy: any;
  let store: MockStore<{ posts: Post[]; }>;
  let postService: PostService;
  let dialogService: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsPageComponent],
      providers: [
        {
          provider: Store,
          useClass: StoreMock,
        },
        DialogService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: {} },
        DestroyService,
        PostService,
        provideMockStore({
          initialState: {
            posts: postInitialState,
          },
          selectors: [
            {
              selector: selectPosts,
              value: of(postResponseMocked, postResponseMocked),
            },
          ],
        }),
      ],
      imports: [StoreModule.forRoot(appReducer)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    postService = TestBed.inject(PostService);
    dialogService = TestBed.inject(DialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete post', () => {
    component.deletePost(1);

    expect(dispatchSpy).toHaveBeenCalledWith(
      PostsDeleteActions.delete({ id: 1 })
    );
  });

  it('should open dialog to update a post', () => {
    spyOn(dialogService, 'dialogDispatch').and.returnValue(of(postMocked));

    component.updatePost(postMocked);

    expect(dispatchSpy).toHaveBeenCalledWith(
      PostsUpdateActions.update({ post: postMocked })
    );
  });

  it('should filter the post', () => {
    component.postsFiltered([postMocked]);

    expect(component.postToRender).toEqual([postMocked]);
  });

  it('should sort posts ASCENDING', () => {
    component.postToRender = postResponseMocked;
    component.sortPosts(PostSort.ASCENDING);

    expect(component.postToRender).toEqual(postResponseMocked);
  });

  it('should sort posts DESCENDING', () => {
    component.postToRender = postResponseMocked;
    component.sortPosts(PostSort.DESCENDING);

    expect(component.postToRender).toEqual(postResponseReverseMocked);
  });

  it('should getPostsInNavBar return posts from the store', () => {
    store.overrideSelector(selectPosts, postResponseMocked);

    component['getAndSetPosts']();
    store.setState({ posts: postResponseMocked }); // set values to send steam again due to skip operator rxjs

    expect(component.postList).toEqual(postResponseMocked);
    expect(component.postToRender).toEqual(postResponseMocked);
  });
});
