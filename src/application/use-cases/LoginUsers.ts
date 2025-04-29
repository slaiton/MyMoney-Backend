import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { LoginUserRepository } from "../../domain/repositories/LoginUserRepository";



export class LoginUsers {
    constructor(private loginRepository: LoginUserRepository) {}
  
    async execute(email: string, password: string): Promise<User> {
        return await this.loginRepository.loginUser(email, password);
      }
  }