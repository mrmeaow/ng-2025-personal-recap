import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountingService } from '../../services/accounting';
import { Modal } from '../../components/ui/modal/modal';

@Component({
  selector: 'app-accounting',
  imports: [CommonModule, ReactiveFormsModule, Modal],
  templateUrl: './accounting.html',
  styleUrl: './accounting.css',
})
export class Accounting {
  private accountingService = inject(AccountingService);
  private fb = inject(FormBuilder);
  
  transactionsResource = this.accountingService.transactionsResource;

  isAddModalOpen = signal(false);
  isDeleteModalOpen = signal(false);
  transactionToDelete = signal<number | null>(null);

  addTransactionForm = this.fb.group({
    description: ['', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0)]],
    type: ['expense', [Validators.required]],
    category: ['General', [Validators.required]],
    date: [new Date().toISOString().split('T')[0], [Validators.required]]
  });

  openAddModal() {
    this.addTransactionForm.reset({
      description: '',
      amount: 0,
      type: 'expense',
      category: 'General',
      date: new Date().toISOString().split('T')[0]
    });
    this.isAddModalOpen.set(true);
  }

  closeAddModal() {
    this.isAddModalOpen.set(false);
  }

  onSubmitAdd() {
    if (this.addTransactionForm.valid) {
      const formValue = this.addTransactionForm.value;
      this.accountingService.addTransaction({
        description: formValue.description!,
        amount: formValue.amount!,
        type: formValue.type as 'income' | 'expense',
        category: formValue.category!,
        date: formValue.date!
      });
      this.closeAddModal();
    }
  }

  openDeleteModal(id: number) {
    this.transactionToDelete.set(id);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.transactionToDelete.set(null);
  }

  confirmDelete() {
    if (this.transactionToDelete() !== null) {
      this.accountingService.deleteTransaction(this.transactionToDelete()!);
      this.closeDeleteModal();
    }
  }
}
