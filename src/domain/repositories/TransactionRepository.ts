import { Transaction } from "../entities/Transaction";

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
  newTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>): Promise<Transaction>;
  getByFilters(filters: { date?: string; category_id?: number; payment_type_id?: number }):  Promise<Transaction[]>;
}