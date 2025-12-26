import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesPurchasesService } from '../../services/sales-purchases';

@Component({
  selector: 'app-sales-purchases',
  imports: [CommonModule],
  templateUrl: './sales-purchases.html',
  styleUrl: './sales-purchases.css',
})
export class SalesPurchases {
  private salesPurchasesService = inject(SalesPurchasesService);
  
  ordersResource = this.salesPurchasesService.ordersResource;

  addOrder(type: 'sale' | 'purchase') {
    const partyName = prompt(`Enter ${type === 'sale' ? 'Customer' : 'Supplier'} Name:`);
    if (!partyName) return;

    const items = parseInt(prompt('Enter Number of Items:', '1') || '0');
    const totalAmount = parseFloat(prompt('Enter Total Amount:', '100') || '0');

    this.salesPurchasesService.addOrder({
      date: new Date().toISOString().split('T')[0],
      type,
      partyName,
      items,
      totalAmount,
      status: 'pending'
    });
  }

  deleteOrder(id: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.salesPurchasesService.deleteOrder(id);
    }
  }
}
