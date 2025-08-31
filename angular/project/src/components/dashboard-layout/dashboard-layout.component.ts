import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
    <mat-sidenav mode="side" opened>
  <mat-toolbar color="primary">ניהול מערכת</mat-toolbar>
  <mat-nav-list>
    <a mat-list-item routerLink="users" routerLinkActive="active">
      <mat-icon>group</mat-icon>
      <span>משתמשים</span>
    </a>
    <a mat-list-item routerLink="reports" routerLinkActive="active">
      <mat-icon>bar_chart</mat-icon>
      <span>דוחות</span>
    </a>
    <a mat-list-item routerLink="settings" routerLinkActive="active">
      <mat-icon>settings</mat-icon>
      <span>הגדרות</span>
    </a>
  </mat-nav-list>
</mat-sidenav>


      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>Admin Dashboard</span>
        </mat-toolbar>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container { height: 100vh; }
    .content { padding: 16px; }
    .active { font-weight: bold; }
  `]
})
export class DashboardLayoutComponent {}
