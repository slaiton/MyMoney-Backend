import { Request, Response } from "express";
import { GetAllUsers } from "../../application/use-cases/GetAllUsers";
import { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";

const userRepository = new UserRepositoryImpl();
const getAllUsersUseCase = new GetAllUsers(userRepository);

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersUseCase.execute();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users" });
  }
};