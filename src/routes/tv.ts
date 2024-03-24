import { Router } from "express";

import {
  getFilteredTvShows,
  addTvShow,
  getAllTvShows,
  updateTvShow,
  deleteTvShow,
  getTvStats,
} from "../controller/tv";
import { auth } from "../middleware/authMiddleware";

const tvRouter = Router();

tvRouter.get("/", auth, getAllTvShows);
tvRouter.get("/stats", auth, getTvStats);
tvRouter.get("/filter", auth, getFilteredTvShows);
tvRouter.put("/:id", auth, updateTvShow);
tvRouter.post("/", auth, addTvShow);
tvRouter.delete("/:id", auth, deleteTvShow);

export default tvRouter;
