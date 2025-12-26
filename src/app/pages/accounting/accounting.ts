import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingService } from '../../services/accounting';

@Component({
  selector: 'app-accounting',
  imports: [CommonModule],
  templateUrl: './accounting.html',
  styleUrl: './accounting.css',
})
export class Accounting {
  private accountingService = inject(AccountingService);
  
  transactionsResource = this.accountingService.transactionsResource;

  addTransaction() {
    const description = prompt('Enter Description:');
    if (!description) return;

    const amount = parseFloat(prompt('Enter Amount:', '100') || '0');
    const type = prompt('Enter Type (income/expense):', 'expense') as 'income' | 'expense';
    const category = prompt('Enter Category:', 'General');

    this.accountingService.addTransaction({
      date: new Date().toISOString().split('T')[0],
      description,
      amount,
      type: (type === 'income' || type === 'expense') ? type : 'expense',
      category: category || 'General'
    });
  }

  deleteTransaction(id: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.accountingService.deleteTransaction(id);
    }
  }
}
