import { Router } from "express";
import { login } from "../../interfaces/controllers/AuthController";
import authMiddleware from '../../middleware/AuthMiddleware'

const router = Router();



router.post("/login", authMiddleware , async (req, res) => {

});

export default router;