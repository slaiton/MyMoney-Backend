import { Router } from "express";
import { transacionController } from "../controllers/TransactionController";

const router = Router();

router.get("/", transacionController);

export default router;