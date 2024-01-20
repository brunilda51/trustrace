import { Router } from "express";

import { getAllUsers, getUser } from "../controller/users";

const usersRouter = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUser);

export default usersRouter;
