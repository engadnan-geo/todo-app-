import { Request, Response, NextFunction } from "express";
import {User} from "../models/user";

interface AuthUser {
  _id: string;
  role: "admin" | "user";
}

interface AuthRequest extends Request {
  user?: AuthUser;
}

// ✅ Get All Users (Admin Only)
export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (req.user.role !== "admin") {
      res.status(403).json({ message: "Access denied: Admins only" });
      return;
    }

    const users = await User.find({}, "-password") // exclude passwords
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error: any) {
    console.error(error.message);
    next(error);
  }
};
