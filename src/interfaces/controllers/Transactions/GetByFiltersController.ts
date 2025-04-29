import { Request, Response } from "express";
import { TransactionRepositoryImpl } from "../../../infrastructure/repositories/TransactionRepositoryImpl";
import { Transaction } from "../../../domain/entities/Transaction";

const transactionRepository = new TransactionRepositoryImpl();

export const transactionFilter = async (req: Request, res: Response) => {
    try {
        const { date, category_id, payment_type_id } = req.query;

        const filters: { date?: string; category_id?: number; payment_type_id?: number } = {};

        if (date && typeof date === "string") {
            filters.date = date;
        }
        if (category_id) {
            filters.category_id = Number(category_id);
        }
        if (payment_type_id) {
            filters.payment_type_id = Number(payment_type_id);
        }

        const transactions = await transactionRepository.getByFilters(filters);

        return res.status(200).json(transactions);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

};