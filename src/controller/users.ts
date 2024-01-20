import User from "../models/user";

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ users });
};

export const getUser = async (req, res, next) => {
  const query = req.params.id ? { _id: req.params.id } : {};
  const user = await User.find(query);
  res.status(200).json({ user });
};
