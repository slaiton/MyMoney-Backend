import { db } from "../db/connection";
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";
import { Transaction } from "../../domain/entities/Transaction";
import { RowDataPacket, ResultSetHeader } from "mysql2";


export class TransactionRepositoryImpl implements TransactionRepository {

  async getAll(): Promise<Transaction[]> {
    const [rows] = await db.query<(Transaction & RowDataPacket)[]>("SELECT * FROM transactions");
    return rows;
  }

  async getByFilters(filters: { date?: string; category_id?: number; payment_type_id?: number }): Promise<Transaction[]> {
    let query = "SELECT * FROM transactions WHERE 1 = 1";
    const params: any[] = [];

    if (filters.date) {
      query += " AND DATE(created_at) = ?";
      params.push(filters.date);
    }

    if (filters.category_id) {
      query += " AND category_id = ?";
      params.push(filters.category_id);
    }

    if (filters.payment_type_id) {
      query += " AND payment_type_id = ?";
      params.push(filters.payment_type_id);
    }

    const [rows] = await db.query<(Transaction & RowDataPacket)[]>(query, params);
    return rows;
  }


  async newTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>): Promise<Transaction> {
    const { title, note, amount, category_id, payment_type_id, user_create_id } = transaction;

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO transactions (title, note, amount, category_id, payment_type_id, user_create_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, note, amount, category_id, payment_type_id, user_create_id]
    );

    const insertedId = result.insertId;

    // Devolver la transacción recién creada
    const [rows] = await db.query<(Transaction & RowDataPacket)[]>(
      "SELECT * FROM transactions WHERE id = ?",
      [insertedId]
    );

    return rows[0];
  }



}