import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  imports: [],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
  reports = [
    { title: 'Sales Summary', description: 'Monthly sales performance and trends.', date: 'Oct 2023', status: 'Ready' },
    { title: 'Inventory Valuation', description: 'Current value of stock on hand.', date: 'Oct 2023', status: 'Ready' },
    { title: 'Expense Report', description: 'Breakdown of company expenses.', date: 'Sep 2023', status: 'Ready' },
    { title: 'Profit & Loss', description: 'Net profit calculation for the quarter.', date: 'Q3 2023', status: 'Processing' },
  ];
}
