import { Injectable, resource, signal } from '@angular/core';

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  private mockData = signal<Transaction[]>([
    { id: 1, date: '2023-10-01', description: 'Product Sales', amount: 5000, type: 'income', category: 'Sales' },
    { id: 2, date: '2023-10-02', description: 'Office Rent', amount: 1200, type: 'expense', category: 'Rent' },
    { id: 3, date: '2023-10-05', description: 'Electricity Bill', amount: 150, type: 'expense', category: 'Utilities' },
    { id: 4, date: '2023-10-10', description: 'Consulting Service', amount: 2000, type: 'income', category: 'Services' },
    { id: 5, date: '2023-10-15', description: 'Internet Bill', amount: 80, type: 'expense', category: 'Utilities' },
  ]);

  transactionsResource = resource({
    loader: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return this.mockData();
    }
  });

  addTransaction(transaction: Omit<Transaction, 'id'>) {
    this.mockData.update(items => [
      ...items,
      { ...transaction, id: Math.max(...items.map(i => i.id), 0) + 1 }
    ]);
    this.transactionsResource.reload();
  }

  deleteTransaction(id: number) {
    this.mockData.update(items => items.filter(i => i.id !== id));
    this.transactionsResource.reload();
  }
}
