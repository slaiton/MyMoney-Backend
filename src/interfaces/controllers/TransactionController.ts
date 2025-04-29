import { Request, Response } from "express";
import { Transaction } from "../../domain/entities/Transaction";
import { TransactionRepositoryImpl } from "../../infrastructure/repositories/TransactionRepositoryImpl";

// Instancia del repositorio
const transactionRepository = new TransactionRepositoryImpl();

// Crear nueva transacción
export const createTransaction = async (req: Request, res: Response) => {
    try {
        const { title, note, amount, category_id, payment_type_id, user_create_id } = req.body;

        // Validar campos requeridos
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

// Buscar transacciones con filtros opcionales
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