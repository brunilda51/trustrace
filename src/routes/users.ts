import { Router } from "express";

import { getAllUsers } from "../controller/users";

const usersRouter = Router();

usersRouter.get("/", getAllUsers);

export default usersRouter;
