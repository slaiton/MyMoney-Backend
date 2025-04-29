import { LoginUserRepository } from "../../domain/repositories/LoginUserRepository";
import { User } from "../../domain/entities/User";
import { comparePassword } from "../../infrastructure/services/PasswordService";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class LoginUserRepositoryImpl implements LoginUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async loginUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    return user;
  }
}