import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalesPurchasesService } from '../../services/sales-purchases';
import { Modal } from '../../components/ui/modal/modal';

@Component({
  selector: 'app-sales-purchases',
  imports: [CommonModule, ReactiveFormsModule, Modal],
  templateUrl: './sales-purchases.html',
  styleUrl: './sales-purchases.css',
})
export class SalesPurchases {
  private salesPurchasesService = inject(SalesPurchasesService);
  private fb = inject(FormBuilder);
  
  ordersResource = this.salesPurchasesService.ordersResource;

  isAddModalOpen = signal(false);
  isDeleteModalOpen = signal(false);
  orderToDelete = signal<number | null>(null);

  addOrderForm = this.fb.group({
    type: ['sale' as 'sale' | 'purchase', [Validators.required]],
    partyName: ['', [Validators.required]],
    items: [1, [Validators.required, Validators.min(1)]],
    totalAmount: [0, [Validators.required, Validators.min(0)]],
    date: [new Date().toISOString().split('T')[0], [Validators.required]],
    status: ['pending' as 'pending' | 'completed' | 'cancelled', [Validators.required]]
  });

  openAddModal(type: 'sale' | 'purchase') {
    this.addOrderForm.reset({
      type: type,
      partyName: '',
      items: 1,
      totalAmount: 0,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    });
    this.isAddModalOpen.set(true);
  }

  closeAddModal() {
    this.isAddModalOpen.set(false);
  }

  onSubmitAdd() {
    if (this.addOrderForm.valid) {
      const formValue = this.addOrderForm.value;
      this.salesPurchasesService.addOrder({
        type: formValue.type as 'sale' | 'purchase',
        partyName: formValue.partyName!,
        items: formValue.items!,
        totalAmount: formValue.totalAmount!,
        date: formValue.date!,
        status: formValue.status as 'pending' | 'completed' | 'cancelled'
      });
      this.closeAddModal();
    }
  }

  openDeleteModal(id: number) {
    this.orderToDelete.set(id);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.orderToDelete.set(null);
  }

  confirmDelete() {
    if (this.orderToDelete() !== null) {
      this.salesPurchasesService.deleteOrder(this.orderToDelete()!);
      this.closeDeleteModal();
    }
  }
}
