import { Router } from "express";

import {
  getFilteredBooks,
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBookStats,
} from "../controller/books";
import { auth } from "../middleware/authMiddleware";

const bookRouter = Router();

bookRouter.get("/", auth, getAllBooks);
bookRouter.post("/", auth, addBook);
bookRouter.put("/:id", auth, updateBook);
bookRouter.delete("/:id", auth, deleteBook);
bookRouter.get("/stats", auth, getBookStats);
bookRouter.get("/filter/:page", auth, getFilteredBooks);

export default bookRouter;
