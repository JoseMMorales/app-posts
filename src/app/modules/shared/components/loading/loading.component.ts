import { Component, Input } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  template: `<div class="spinner-container" *ngIf="isLoading">
    <mat-spinner></mat-spinner>
  </div>`,
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
})
export class LoadingComponent {
  @Input()
  isLoading: boolean | null = false;
}
