import { Router } from "express";

import {
  getFilteredMovies,
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMovieStats,
} from "../controller/movies";
import { auth } from "../middleware/authMiddleware";

const movieRouter = Router();

movieRouter.get("/", auth, getAllMovies);
movieRouter.get("/stats", auth, getMovieStats);
movieRouter.get("/filter", auth, getFilteredMovies);
movieRouter.put("/:id", auth, updateMovie);
movieRouter.post("/", auth, addMovie);
movieRouter.delete("/:id", auth, deleteMovie);

export default movieRouter;
