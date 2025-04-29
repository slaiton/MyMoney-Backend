import { Router } from "express";
import { createTransaction } from "../controllers/Transactions/CreateController";
import { transactionFilter } from "../controllers/Transactions/GetByFiltersController";
import authMiddleware from '../../middleware/AuthMiddleware'

const router = Router();

router.post("/", authMiddleware , async (req, res) => {

    try {
        await createTransaction(req, res);
      } catch (error) {
        res.status(500).json({ message: "Error al obtener los vehículos disponibles" });
      }
    });

router.get("/", authMiddleware,  async (req, res) => {
    try {
        await transactionFilter(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los vehículos disponibles" });
    }
});

export default router;