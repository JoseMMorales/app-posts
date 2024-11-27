import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './modules/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./modules/pages/posts/posts.module').then(m => m.PostsModule),
    canActivate: [authGuard],
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
