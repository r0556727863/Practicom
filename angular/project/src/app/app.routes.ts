import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsersComponent } from '../components/users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UsersComponent },
      // { path: 'reports', loadComponent: () => import('./components/reports/reports.component').then(m => m.ReportsComponent) },
      // { path: 'settings', loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent) },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
