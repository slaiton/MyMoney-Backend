import { User } from "../entities/User";

export interface LoginUserRepository {
    loginUser(email: string, password: string): Promise<User>;
  }