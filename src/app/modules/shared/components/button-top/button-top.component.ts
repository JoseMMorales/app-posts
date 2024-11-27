/* eslint-disable prettier/prettier */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, debounceTime, fromEvent, takeUntil } from 'rxjs';
import { DestroyService } from '../../services/destroy/destroy.service';

@Component({
  selector: 'app-button-top',
  template: `<button
    *ngIf="showBtn$ | async"
    (click)="scrollToTop()"
    class="button-top">
    <mat-icon>arrow_upward</mat-icon>
  </button>`,
  styleUrls: ['./button-top.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class ButtonTopComponent {
  showBtn$ = new BehaviorSubject<boolean>(false);

  constructor(private destroyed$: DestroyService) {
    this.hideShowTopButton();
  }

  dealWithScroll(scrollY: number): void {
    scrollY > 160 ? this.showBtn$.next(true) : this.showBtn$.next(false);
  }

  scrollToTop(): void {
    (function smoothscroll(): void {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  private hideShowTopButton(): void {
    fromEvent(window, 'scroll')
      .pipe(debounceTime(200), takeUntil(this.destroyed$))
      .subscribe(() => this.dealWithScroll(window.scrollY));
  }
}
