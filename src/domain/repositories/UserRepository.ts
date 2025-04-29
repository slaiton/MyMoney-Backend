import { User } from "../entities/User";

export interface UserRepository {
  getAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
}