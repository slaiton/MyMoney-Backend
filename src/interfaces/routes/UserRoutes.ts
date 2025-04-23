import { Router } from "express";
import { getAllUsersController } from "../controllers/UserController";

const router = Router();

router.get("/", getAllUsersController);

export default router;