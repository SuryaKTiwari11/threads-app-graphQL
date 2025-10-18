import { prismaClient } from "../lib/db.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImageURL?: string;
}

export interface UserTokenPayload {
  email: string;
  password: string;
}
class UserService {
  public static async createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password, profileImageURL } = payload;

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const salt = crypto.randomBytes(16).toString("hex");
    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);

    const userData: any = {
      firstName,
      lastName,
      email,
      password: hashPassword,
      salt,
    };

    if (profileImageURL) {
      userData.profileImageURL = profileImageURL;
    }

    const user = await prismaClient.user.create({
      data: userData,
    });

    return user.id;
  }
  private static async getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }
  private static generateHashPassword(password: string, salt: string) {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
  }
  public static async getUserToken(payload: UserTokenPayload) {
    const { email, password } = payload;

    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const userSalt = user.salt;
    const hashedPassword = this.generateHashPassword(password, userSalt);

    if (hashedPassword !== user.password) {
      throw new Error("Invalid email or password");
    }

    //no password
    const tokenPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1d" });
    return token;
  }

  public static async getUserById(id: string) {
    const user = await prismaClient.user.findUnique({ where: { id } });
    return user;
  }

  public static decodeToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  public static async getUserFromToken(token: string) {
    try {
      const decoded = this.decodeToken(token) as any;
      const user = await this.getUserById(decoded.id);
      return user;
    } catch (error) {
      return null;
    }
  }
}

export default UserService;
