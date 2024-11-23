import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchPostsComponent } from './search-posts.component';
import { Post } from 'src/app/modules/shared/models/post.model';

export const postMockedInTest: Post = {
  id: 1,
  title: 'FirstTitle',
  body: 'FirstBody',
  userId: 1,
  comments: [],
};

export const postsMocked: Post[] = [
  postMockedInTest,
  {
    id: 2,
    title: 'SecondTitle',
    body: 'SecondBody',
    userId: 2,
    comments: [],
  },
];

describe('SearchPostsComponent', () => {
  let component: SearchPostsComponent;
  let fixture: ComponentFixture<SearchPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPostsComponent],
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit empty Posts', () => {
    const spyEmit = spyOn(component.postsFilteredEmitted, 'emit');

    component.filterPosts('');

    expect(spyEmit).toHaveBeenCalledOnceWith([]);
  });

  it('should emit Post filtering by title', () => {
    component.postsToFilter = postsMocked;

    const spyEmit = spyOn(component.postsFilteredEmitted, 'emit');

    component.filterPosts('FirstTitle');

    expect(spyEmit).toHaveBeenCalledOnceWith([postMockedInTest]);
  });

  it('should emit Post filtering by body', () => {
    component.postsToFilter = postsMocked;

    const spyEmit = spyOn(component.postsFilteredEmitted, 'emit');

    component.filterPosts('FirstBody');

    expect(spyEmit).toHaveBeenCalledOnceWith([postMockedInTest]);
  });
});
