import { Request, Response } from "express";
import { TransactionRepositoryImpl } from "../../../infrastructure/repositories/TransactionRepositoryImpl";
import { Transaction } from "../../../domain/entities/Transaction";

const transactionRepository = new TransactionRepositoryImpl();

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { title, note, amount, category_id, payment_type_id, user_create_id } = req.body;

    if (!title || !amount || !category_id || !payment_type_id || !user_create_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
        const newTransaction = await transactionRepository.newTransaction({
            title,
            note,
            amount,
            category_id,
            payment_type_id,
            user_create_id
        } as Omit<Transaction, 'id' | 'created_at' | 'updated_at'>);

    return res.status(201).json(newTransaction);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};