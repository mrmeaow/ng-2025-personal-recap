import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Inventory', path: '/inventory', icon: '📦' },
    { label: 'Accounting', path: '/accounting', icon: '💰' },
    { label: 'Sales & Purchases', path: '/sales-purchases', icon: '🛒' },
    { label: 'Reports', path: '/reports', icon: '📈' },
  ];
}
