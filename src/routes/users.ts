import { Router } from "express";

import { getAllUsers, getUser, addUser } from "../controller/users";
import { auth } from "../middleware/authMiddleware";

const usersRouter = Router();

usersRouter.get("/", auth, getAllUsers);
usersRouter.post("/", addUser);
usersRouter.get("/:id", auth, getUser);

export default usersRouter;
