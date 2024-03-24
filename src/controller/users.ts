import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { UserInput } from "../entities";
import { passwordHash } from "../utils/authentication";

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ users });
};

export const getUser = async (req, res, next) => {
  const query = req.params.id ? { _id: req.params.id } : {};
  const user = await User.find(query);
  res.status(200).json({ user });
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: UserInput = req.body;

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = passwordHash(body.password);

    req.body.password = hashedPassword;
    const user = await User.create({
      email: body.email,
      username: body.username,
      password: hashedPassword,
    });
    const { password, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
