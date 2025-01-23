import { Routes } from '@angular/router';
import { isLoggedInGuard } from './guards/is_logged_inguards';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./tasks/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'user-login',
    loadComponent: () => import('./tasks/user-login/user-login.page').then( m => m.UserLoginPage),
    
  },
  {
    path: 'admin-login',
    loadComponent: () => import('./tasks/admin-login/admin-login.page').then( m => m.AdminLoginPage)
  },
  {
    path: 'user-dashboard',
    loadComponent: () => import('./tasks/user-dashboard/user-dashboard.page').then( m => m.UserDashboardPage),
    canActivate : [isLoggedInGuard],
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./tasks/admin-dashboard/admin-dashboard.page').then( m => m.AdminDashboardPage),
    canActivate : [isLoggedInGuard],
  },
  {
    path: 'photo-selector',
    loadComponent: () => import('./tasks/photo-selector/photo-selector.page').then( m => m.PhotoSelectorPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./tasks/about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'project',
    loadComponent: () => import('./tasks/project/project.page').then( m => m.ProjectPage)
  },
  {
    path: 'task',
    loadComponent: () => import('./tasks/task/task.page').then( m => m.TaskPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./tasks/contact/contact.page').then( m => m.ContactPage)
  },
  
  
];
