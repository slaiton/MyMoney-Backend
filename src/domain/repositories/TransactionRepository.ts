import { Transaction } from "../entities/Transaction";

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
}