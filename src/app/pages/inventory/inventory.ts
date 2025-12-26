import { Component, inject } from '@angular/core';
import { InventoryService } from '../../services/inventory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  private inventoryService = inject(InventoryService);
  
  itemsResource = this.inventoryService.itemsResource;

  addItem() {
    const name = prompt('Enter Item Name:');
    if (!name) return;
    
    const sku = prompt('Enter SKU:', 'SKU-' + Math.floor(Math.random() * 1000));
    const category = prompt('Enter Category:', 'General');
    const quantity = parseInt(prompt('Enter Quantity:', '10') || '0');
    const price = parseFloat(prompt('Enter Price:', '100') || '0');

    this.inventoryService.addItem({
      name,
      sku: sku || 'UNKNOWN',
      category: category || 'General',
      quantity,
      price
    });
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryService.deleteItem(id);
    }
  }
}
