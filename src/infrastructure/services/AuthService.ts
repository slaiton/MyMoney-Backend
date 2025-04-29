import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export class AuthService {
  generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, JWT_SECRET);
  }
}
