import { Request, Response } from "express";
import { passwordCompare, generateToken } from "../utils/authentication";
import User from "../models/user";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const users = await User.findOne({ email: email });

    if (!users) {
      return res.status(400).json({
        status: "Bad Request!",
        message: "Wrong email or password!",
      });
    }

    const compare = await passwordCompare(password, users.password);

    if (compare) {
      const token = generateToken(
        users.id,
        users.email,
        users.name,
        users.username
      );

      const res_token = { type: "Bearer", token: token };
      return res.status(200).json({
        status: "Ok!",
        message: "Successfully login!",
        result: res_token,
      });
    } else {
      return res.status(400).json({
        status: "Bad Request!",
        message: "Wrong email or password!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Internal server Error!",
      message: "Internal server Error!" + error,
    });
  }
};
