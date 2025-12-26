import { Component, inject, signal } from '@angular/core';
import { InventoryService } from '../../services/inventory';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '../../components/ui/modal/modal';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, ReactiveFormsModule, Modal],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  private inventoryService = inject(InventoryService);
  private fb = inject(FormBuilder);
  
  itemsResource = this.inventoryService.itemsResource;
  
  // Modals state
  isAddModalOpen = signal(false);
  isDeleteModalOpen = signal(false);
  itemToDelete = signal<number | null>(null);

  // Forms
  addItemForm = this.fb.group({
    name: ['', [Validators.required]],
    sku: ['', [Validators.required]],
    category: ['General', [Validators.required]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(0)]]
  });

  openAddModal() {
    this.addItemForm.reset({
      category: 'General',
      quantity: 0,
      price: 0
    });
    this.isAddModalOpen.set(true);
  }

  closeAddModal() {
    this.isAddModalOpen.set(false);
  }

  onSubmitAdd() {
    if (this.addItemForm.valid) {
      const val = this.addItemForm.value;
      this.inventoryService.addItem({
        name: val.name!,
        sku: val.sku!,
        category: val.category!,
        quantity: val.quantity!,
        price: val.price!
      });
      this.closeAddModal();
    }
  }

  openDeleteModal(id: number) {
    this.itemToDelete.set(id);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.itemToDelete.set(null);
  }

  confirmDelete() {
    const id = this.itemToDelete();
    if (id !== null) {
      this.inventoryService.deleteItem(id);
      this.closeDeleteModal();
    }
  }
}