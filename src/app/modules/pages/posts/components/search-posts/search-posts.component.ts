import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/modules/shared/models/post.model';

@Component({
  selector: 'app-search-posts',
  template: ` <div class="search-container">
    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input
        matInput
        [(ngModel)]="searchPost"
        (keyup)="filterPosts(searchPost)"
      />
      <mat-icon matPrefix>search</mat-icon>
    </mat-form-field>
  </div>`,
  styleUrls: ['./search-posts.component.scss'],
})
export class SearchPostsComponent {
  searchPost: string = '';
  @Input() postsToFilter: Post[] = [];
  @Output() postsFiltered: EventEmitter<Post[]> = new EventEmitter<Post[]>();

  filterPosts(searchPost: string): void {
    let postsFiltered: Post[] = [];

    if (searchPost === '') {
      postsFiltered = this.postsToFilter;
    } else {
      postsFiltered = this.postsToFilter.filter((post: Post) => {
        return (
          post.title.toLowerCase().includes(searchPost.toLowerCase()) ||
          post.body.toLowerCase().includes(searchPost.toLowerCase())
        );
      });
    }

    this.postsFiltered.emit(postsFiltered);
  }
}
