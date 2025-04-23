import { db } from "../db/connection";
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";
import { Transaction } from "../../domain/entities/Transaction";
import { RowDataPacket } from "mysql2";


export class TransactionRepositoryImpl implements TransactionRepository {

  async getAll(): Promise<Transaction[]> {
    const [rows] = await db.query<(Transaction & RowDataPacket)[]>("SELECT * FROM transactions");
    return rows;
  }

}