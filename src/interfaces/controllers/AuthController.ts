import { Request, Response } from "express";
import { LoginUsers } from "../../application/use-cases/LoginUsers";
import { LoginUserRepositoryImpl } from "../../infrastructure/repositories/LoginUserRepositoryImpl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";
import { AuthService } from "../../infrastructure/services/AuthService";

const userRepository = new UserRepositoryImpl();
const loginRepository = new LoginUserRepositoryImpl(userRepository);
const loginUserUseCase = new LoginUsers(loginRepository);
const authService = new AuthService();

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email y password son requeridos" });
      return;
    }

    const user = await loginUserUseCase.execute(email, password);

    const token = authService.generateToken({ id: user.id, email: user.email });

    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Ocurrió un error inesperado" });
    }
  }
};