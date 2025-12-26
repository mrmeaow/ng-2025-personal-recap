import { Injectable, resource, signal } from '@angular/core';

export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // Mock data store
  private mockData = signal<InventoryItem[]>([
    { id: 1, name: 'Laptop', sku: 'LAP001', quantity: 10, price: 999, category: 'Electronics' },
    { id: 2, name: 'Wireless Mouse', sku: 'MOU001', quantity: 50, price: 25, category: 'Electronics' },
    { id: 3, name: 'Office Chair', sku: 'CHA001', quantity: 15, price: 150, category: 'Furniture' },
    { id: 4, name: 'Desk Lamp', sku: 'LMP001', quantity: 30, price: 45, category: 'Furniture' },
    { id: 5, name: 'Monitor 27"', sku: 'MON001', quantity: 20, price: 300, category: 'Electronics' },
  ]);

  // Resource for reading data
  itemsResource = resource({
    loader: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return this.mockData();
    }
  });

  // Actions
  addItem(item: Omit<InventoryItem, 'id'>) {
    this.mockData.update(items => [
      ...items, 
      { ...item, id: Math.max(...items.map(i => i.id), 0) + 1 }
    ]);
    this.itemsResource.reload();
  }
  
  deleteItem(id: number) {
    this.mockData.update(items => items.filter(i => i.id !== id));
    this.itemsResource.reload();
  }
}
