import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'inventory', loadComponent: () => import('./pages/inventory/inventory').then(m => m.Inventory) },
      { path: 'accounting', loadComponent: () => import('./pages/accounting/accounting').then(m => m.Accounting) },
      { path: 'sales-purchases', loadComponent: () => import('./pages/sales-purchases/sales-purchases').then(m => m.SalesPurchases) },
      { path: 'reports', loadComponent: () => import('./pages/reports/reports').then(m => m.Reports) },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
