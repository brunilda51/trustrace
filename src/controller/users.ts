import User from "../models/user";

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ users });
};
