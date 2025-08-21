import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  "$2a$12$5wuvKK2FNb0jwA6NFpPcYO1zt5GaWPirk6LXkqqbWgFSuebkjJqJG";
const JWT_SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "development"
    ? "dev_only_insecure_jwt_secret_change_me"
    : "");

export class AuthService {
  static async verifyPassword(password: string): Promise<boolean> {
    if (!ADMIN_PASSWORD_HASH) return false;
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    return isValid;
  }

  static generateToken(): string {
    if (!JWT_SECRET) throw new Error("JWT secret absent");
    const payload = {
      user: "admin",
      role: "admin",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 heures
    };

    return jwt.sign(payload, JWT_SECRET);
  }

  static verifyToken(token: string): boolean {
    try {
      if (!JWT_SECRET) return false;
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch {
      return false;
    }
  }
}
