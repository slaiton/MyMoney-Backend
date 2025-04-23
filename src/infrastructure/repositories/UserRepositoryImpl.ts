import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { db } from "../db/connection";
import { RowDataPacket } from "mysql2";

export class UserRepositoryImpl implements UserRepository {
  async getAll(): Promise<User[]> {
    const [rows] = await db.query<(User & RowDataPacket)[]>("SELECT * FROM users");
    return rows;
  }
}