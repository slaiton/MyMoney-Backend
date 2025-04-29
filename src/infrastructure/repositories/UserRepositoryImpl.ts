import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { db } from "../db/connection";
import { RowDataPacket } from "mysql2";

export class UserRepositoryImpl implements UserRepository {
  async getAll(): Promise<User[]> {
    const [rows] = await db.query<(User & RowDataPacket)[]>("SELECT * FROM users");
    return rows;
  }


  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT id, email, password, name FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) return null;

    const user = rows[0] as RowDataPacket;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }

}