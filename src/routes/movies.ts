import { Router } from "express";

import {
  getFilteredMovies,
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieStats,
} from "../controller/movies";

const movieRouter = Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/stats", getMovieStats);
movieRouter.get("/filter", getFilteredMovies);
movieRouter.put("/:id", updateMovie);
movieRouter.post("/", addMovie);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;
