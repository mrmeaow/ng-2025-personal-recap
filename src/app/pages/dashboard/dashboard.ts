import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  stats = [
    { label: 'Total Sales', value: '$12,450', change: '+12%', icon: '💰' },
    { label: 'Active Orders', value: '45', change: '+5%', icon: '📦' },
    { label: 'New Customers', value: '120', change: '+18%', icon: '👥' },
    { label: 'Pending Issues', value: '3', change: '-2%', icon: '⚠️' },
  ];
}
