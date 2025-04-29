import express from "express";
import dotenv from "dotenv";
import userRoutes from "./interfaces/routes/UserRoutes";
import transactionRoutes from "./interfaces/routes/TransactionRoutes";
import authRoutes from "./interfaces/routes/AuthRoutes";


dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

export default app;