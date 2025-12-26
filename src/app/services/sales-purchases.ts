import { Injectable, resource, signal } from '@angular/core';

export interface Order {
  id: number;
  date: string;
  type: 'sale' | 'purchase';
  partyName: string; // Customer or Supplier
  items: number; // Count of items
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class SalesPurchasesService {
  private mockData = signal<Order[]>([
    { id: 1, date: '2023-10-01', type: 'sale', partyName: 'John Doe', items: 2, totalAmount: 1500, status: 'completed' },
    { id: 2, date: '2023-10-02', type: 'purchase', partyName: 'Tech Supplier Inc.', items: 50, totalAmount: 5000, status: 'pending' },
    { id: 3, date: '2023-10-05', type: 'sale', partyName: 'Alice Smith', items: 1, totalAmount: 999, status: 'completed' },
    { id: 4, date: '2023-10-08', type: 'purchase', partyName: 'Office Depot', items: 10, totalAmount: 300, status: 'completed' },
    { id: 5, date: '2023-10-12', type: 'sale', partyName: 'Bob Brown', items: 3, totalAmount: 2500, status: 'cancelled' },
  ]);

  ordersResource = resource({
    loader: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return this.mockData();
    }
  });

  addOrder(order: Omit<Order, 'id'>) {
    this.mockData.update(items => [
      ...items,
      { ...order, id: Math.max(...items.map(i => i.id), 0) + 1 }
    ]);
    this.ordersResource.reload();
  }

  deleteOrder(id: number) {
    this.mockData.update(items => items.filter(i => i.id !== id));
    this.ordersResource.reload();
  }
}
