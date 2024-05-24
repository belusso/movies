import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: ListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },

];
