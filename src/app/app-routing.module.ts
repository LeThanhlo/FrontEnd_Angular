// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
  {
    path: '', // Đây là đường dẫn gốc cho GuestComponent
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: '/login', // Thêm dòng này để chuyển hướng đến /login
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component').then((c) => c.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/project',
        pathMatch: 'full'
      },
      {
        path: 'project',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component')
      },
      {
        path: 'task',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'menus',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'users',
        loadComponent: () => import('./demo/Application/users/users-list-component/users.component').then((m) => m.UsersComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
