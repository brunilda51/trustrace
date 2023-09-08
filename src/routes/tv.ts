import { Router } from "express";

import {
  getFilteredTvShows,
  addTvShow,
  getAllTvShows,
  updateTvShow,
  deleteTvShow,
  getTvStats,
} from "../controller/tv";

const tvRouter = Router();

tvRouter.get("/", getAllTvShows);
tvRouter.get("/stats", getTvStats);
tvRouter.get("/filter", getFilteredTvShows);
tvRouter.put("/:id", updateTvShow);
tvRouter.post("/", addTvShow);
tvRouter.delete("/:id", deleteTvShow);

export default tvRouter;
