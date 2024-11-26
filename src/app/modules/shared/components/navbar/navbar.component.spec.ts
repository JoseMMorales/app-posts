import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import {
  postMocked,
  postResponseMocked,
  postThirdMocked
} from 'src/app/modules/core/testing/mock/post.mock';
import {
  routerEvent$,
  RouterMock,
} from 'src/app/modules/core/testing/stub/router.mock';

import { StoreModule } from '@ngrx/store';
import { initialState as postInitialState } from 'src/app/modules/core/store/posts/posts.state';
import { appReducer } from 'src/app/modules/core/store/app.state';
import { selectPosts } from 'src/app/modules/core/store/posts/selector/posts.selector';
import { PostsCreateActions } from 'src/app/modules/core/store/posts/posts.actions';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { PostService } from '../../services/post/post.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { DestroyService } from '../../services/destroy/destroy.service';

import { NavbarComponent } from './navbar.component';
import { Post } from '../../models/post.model';

import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let dispatchSpy: any;
  let dialogService: DialogService;
  let postService: PostService;
  let store: MockStore<{ posts: Post[]; }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        StoreModule.forRoot(appReducer),
        MatDialogModule,
      ],
      providers: [
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
        {
          provide: Router,
          useClass: RouterMock,
        },
        DestroyService,
        DialogService,
        MatDialog
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    dialogService = TestBed.inject(DialogService);
    postService = TestBed.inject(PostService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog to create a post', () => {
    const spyPostService = spyOn(postService, 'addUserIdInPost').and.returnValues(postThirdMocked);
    spyOn(dialogService, 'dialogDispatch').and.returnValue(
      of(postMocked)
    );

    component.openDialogToCreatePost();

    expect(spyPostService).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(
      PostsCreateActions.create({ post: postThirdMocked })
    );
  });

  it('should logout to home view', () => {
    spyOn(router, 'navigate');

    component.logOut();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });


  it('should getRoute NOT identify posts are in page', () => {
    const navEndEventFalse: NavigationEnd = new NavigationEnd(
      1,
      '/fakeUrl',
      '/anotherFakeUrl'
    );
    routerEvent$.next(navEndEventFalse);
    component['getRoute']();

    expect(component.isPostsPage$.getValue()).toBe(false);
  });

  it('should getRoute identify posts are in page', () => {
    const navEndEventFalse: NavigationEnd = new NavigationEnd(
      1,
      '/fakeUrl',
      '/posts'
    );
    routerEvent$.next(navEndEventFalse);
    component['getRoute']();

    expect(component.isPostsPage$.getValue()).toBe(true);
  });

  it('should getPostsInNavBar return posts from the store', () => {
    store.overrideSelector(selectPosts, postResponseMocked);

    component['getPostsInNavBar']();
    store.setState({ posts: postResponseMocked }); // set values to send steam again due to skip operator rxjs

    expect(component.postList).toEqual(postResponseMocked);
  });
});
